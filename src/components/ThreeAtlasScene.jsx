import { useEffect, useRef, useState } from "react";
import {
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  GridHelper,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three";

function pickText(node, lang) {
  return {
    label: lang === "zh" ? node.labelZh || node.label : node.label,
    summary: lang === "zh" ? node.summaryZh || node.summary : node.summary
  };
}

function createTextSprite(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 96;

  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "600 30px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#0f172a";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new CanvasTexture(canvas);
  const material = new SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false
  });
  const sprite = new Sprite(material);
  sprite.scale.set(1.2, 0.45, 1);

  return sprite;
}

function getSceneUrl() {
  return `${import.meta.env.BASE_URL}three3.json`;
}

export function ThreeAtlasScene({ lang = "zh", activeTrack = "all", onSelectTrack }) {
  const containerRef = useRef(null);
  const sceneStateRef = useRef(null);
  const selectTrackRef = useRef(onSelectTrack);
  const activeTrackRef = useRef(activeTrack);
  const [sceneData, setSceneData] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    selectTrackRef.current = onSelectTrack;
  }, [onSelectTrack]);

  useEffect(() => {
    activeTrackRef.current = activeTrack;
  }, [activeTrack]);

  useEffect(() => {
    let isMounted = true;

    async function loadSceneData() {
      try {
        const response = await fetch(getSceneUrl());
        if (!response.ok) {
          throw new Error(`Unable to load three3.json: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setSceneData(data);
          setActiveNode(data.nodes?.[0] ?? null);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError);
        }
      }
    }

    loadSceneData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !sceneData || error) return undefined;

    const container = containerRef.current;
    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 260);
    const scene = new Scene();
    scene.background = new Color(sceneData.palette?.background ?? "#f8fbfb");

    const camera = new PerspectiveCamera(sceneData.camera?.fov ?? 42, width / height, 0.1, 100);
    camera.position.fromArray(sceneData.camera?.position ?? [0, 3.6, 8.2]);
    camera.lookAt(...(sceneData.camera?.lookAt ?? [0, 0, 0]));

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.setAttribute("aria-label", "Open CS Atlas 3D route map");
    renderer.domElement.setAttribute("role", "img");
    container.appendChild(renderer.domElement);

    const root = new Group();
    root.rotation.x = -0.18;
    scene.add(root);

    const ambientLight = new AmbientLight("#ffffff", 2.2);
    const directionalLight = new DirectionalLight("#ffffff", 2.4);
    directionalLight.position.set(4, 6, 5);
    scene.add(ambientLight, directionalLight);

    const grid = new GridHelper(9, 12, sceneData.palette?.grid ?? "#cfe5e6", "#d9ecee");
    grid.position.y = -0.45;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    root.add(grid);

    const nodeMeshes = [];
    const nodeMap = new Map();

    for (const node of sceneData.nodes ?? []) {
      const group = new Group();
      const position = new Vector3(...node.position);
      group.position.copy(position);
      group.userData = { node };

      const rim = new Mesh(
        new SphereGeometry(0.27, 32, 32),
        new MeshStandardMaterial({ color: sceneData.palette?.nodeRim ?? "#ffffff", roughness: 0.45 })
      );
      const core = new Mesh(
        new SphereGeometry(0.2, 32, 32),
        new MeshStandardMaterial({
          color: node.color,
          metalness: 0.08,
          roughness: 0.28,
          emissive: node.color,
          emissiveIntensity: 0.15
        })
      );
      const label = createTextSprite(pickText(node, lang).label);
      label.position.set(0, 0.58, 0);

      group.add(rim, core, label);
      root.add(group);
      nodeMeshes.push(group);
      nodeMap.set(node.id, position);
    }

    const routeMaterial = new LineBasicMaterial({
      color: sceneData.palette?.route ?? "#0f766e",
      linewidth: 2,
      transparent: true,
      opacity: 0.75
    });

    for (const [from, to] of sceneData.edges ?? []) {
      const start = nodeMap.get(from);
      const end = nodeMap.get(to);
      if (!start || !end) continue;

      const curve = new CatmullRomCurve3([
        start,
        new Vector3((start.x + end.x) / 2, Math.max(start.y, end.y) + 0.42, (start.z + end.z) / 2),
        end
      ]);
      const points = curve.getPoints(28);
      const geometry = new BufferGeometry().setFromPoints(points);
      root.add(new Line(geometry, routeMaterial));
    }

    const raycaster = new Raycaster();
    const pointer = new Vector2(-10, -10);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hoveredNodeId = null;
    let frameId = 0;

    function setPointer(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function handlePointerMove(event) {
      setPointer(event);
    }

    function handleClick() {
      if (!hoveredNodeId) return;
      const node = sceneData.nodes.find((item) => item.id === hoveredNodeId);
      if (!node) return;

      setActiveNode(node);
      selectTrackRef.current?.(node.track);
    }

    function handleResize() {
      const nextWidth = Math.max(container.clientWidth, 320);
      const nextHeight = Math.max(container.clientHeight, 260);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    }

    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    function animate() {
      frameId = window.requestAnimationFrame(animate);
      const shouldReduceMotion = reduceMotion.matches;
      root.rotation.y += shouldReduceMotion ? 0 : (sceneData.motion?.rotationSpeed ?? 0.0016);

      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObjects(nodeMeshes, true);
      hoveredNodeId = null;

      for (const group of nodeMeshes) {
        const currentTrack = activeTrackRef.current;
        const isActiveTrack = currentTrack !== "all" && group.userData.node.track === currentTrack;
        const pulse = shouldReduceMotion
          ? 1
          : 1 + Math.sin(Date.now() * 0.003 + group.position.x) * (sceneData.motion?.nodePulse ?? 0.08);
        group.scale.setScalar(isActiveTrack ? 1.16 * pulse : 1);
      }

      if (intersections.length) {
        const group = intersections[0].object.parent;
        if (group?.userData?.node) {
          hoveredNodeId = group.userData.node.id;
          group.scale.setScalar(sceneData.motion?.hoverScale ?? 1.28);
          renderer.domElement.style.cursor = "pointer";
        }
      } else {
        renderer.domElement.style.cursor = "default";
      }

      renderer.render(scene, camera);
    }

    animate();
    sceneStateRef.current = { renderer, scene, root };

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.dispose();
      container.replaceChildren();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      sceneStateRef.current = null;
    };
  }, [error, lang, sceneData]);

  if (error) {
    return null;
  }

  const activeText = activeNode ? pickText(activeNode, lang) : null;

  return (
    <div className="three-atlas" aria-label="Open CS Atlas interactive route map">
      <div className="three-atlas-canvas" ref={containerRef} />
      {activeText ? (
        <div className="three-atlas-panel">
          <strong>{activeText.label}</strong>
          <span>{activeText.summary}</span>
        </div>
      ) : null}
      <div className="three-atlas-controls" aria-label="3D route shortcuts">
        {(sceneData?.nodes ?? []).map((node) => {
          const nodeText = pickText(node, lang);
          return (
            <button
              className={activeNode?.id === node.id ? "is-active" : ""}
              type="button"
              key={node.id}
              onClick={() => {
                setActiveNode(node);
                selectTrackRef.current?.(node.track);
              }}
            >
              {nodeText.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
