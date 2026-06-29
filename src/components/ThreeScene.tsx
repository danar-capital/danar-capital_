"use client";

import { useEffect, useRef } from "react";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    let disposed = false;

    // Dynamic import — runs only client side
    import("three").then((THREE) => {
      if (disposed || !container) return;

      const W = window.innerWidth;
      const H = window.innerHeight;

      // ── Renderer ──────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // ── Scene & Camera ─────────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 50);
      camera.position.z = 7;

      // ── Colors ────────────────────────────────────────────────────
      const GOLD_RGB = [0.788, 0.635, 0.153]; // #C9A227
      const BLUE_RGB = [0.106, 0.227, 0.420]; // #1B3A6B
      const WHITE_RGB = [1.0, 1.0, 1.0];

      // ── Particle system ───────────────────────────────────────────
      const N = 240;
      const positions = new Float32Array(N * 3);
      const colors = new Float32Array(N * 3);
      const sizes = new Float32Array(N);
      const velocities = new Float32Array(N * 3);

      for (let i = 0; i < N; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

        velocities[i * 3]     = (Math.random() - 0.5) * 0.002;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

        const r = Math.random();
        const c = r > 0.6 ? GOLD_RGB : r > 0.15 ? BLUE_RGB : WHITE_RGB;
        colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
        sizes[i] = Math.random() * 0.06 + 0.02;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
      pGeo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

      const pMat = new THREE.PointsMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        size: 0.05,
        sizeAttenuation: true,
      });
      const particleSystem = new THREE.Points(pGeo, pMat);
      scene.add(particleSystem);

      // ── Inner icosahedron wireframe ───────────────────────────────
      const icosaGeo   = new THREE.IcosahedronGeometry(2.4, 1);
      const icosaEdges = new THREE.EdgesGeometry(icosaGeo);
      const icosa = new THREE.LineSegments(
        icosaEdges,
        new THREE.LineBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.08 })
      );
      scene.add(icosa);

      // ── Outer sphere wireframe ────────────────────────────────────
      const outerGeo   = new THREE.IcosahedronGeometry(5.0, 2);
      const outerEdges = new THREE.EdgesGeometry(outerGeo);
      const outer = new THREE.LineSegments(
        outerEdges,
        new THREE.LineBasicMaterial({ color: 0x1B3A6B, transparent: true, opacity: 0.035 })
      );
      scene.add(outer);

      // ── Octahedron (extra geometric shape) ───────────────────────
      const octaGeo   = new THREE.OctahedronGeometry(3.2, 0);
      const octaEdges = new THREE.EdgesGeometry(octaGeo);
      const octa = new THREE.LineSegments(
        octaEdges,
        new THREE.LineBasicMaterial({ color: 0x3a7bd5, transparent: true, opacity: 0.045 })
      );
      scene.add(octa);

      // ── Gold torus ring ───────────────────────────────────────────
      const torus1 = new THREE.Mesh(
        new THREE.TorusGeometry(3.4, 0.009, 3, 120),
        new THREE.MeshBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.2 })
      );
      torus1.rotation.x = Math.PI / 2.6;
      torus1.rotation.y = Math.PI / 8;
      scene.add(torus1);

      // ── Blue torus ring ───────────────────────────────────────────
      const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(5.8, 0.006, 3, 120),
        new THREE.MeshBasicMaterial({ color: 0x3a6cb7, transparent: true, opacity: 0.07 })
      );
      torus2.rotation.z = Math.PI / 5;
      torus2.rotation.x = Math.PI / 4;
      scene.add(torus2);

      // ── Small accent ring ──────────────────────────────────────────
      const torus3 = new THREE.Mesh(
        new THREE.TorusGeometry(1.8, 0.006, 3, 80),
        new THREE.MeshBasicMaterial({ color: 0xF0C040, transparent: true, opacity: 0.12 })
      );
      torus3.rotation.y = Math.PI / 3;
      scene.add(torus3);

      // ── Grid floor (3D perspective grid) ──────────────────────────
      const gridHelper = new THREE.GridHelper(20, 20, 0x1B3A6B, 0x1B3A6B);
      (gridHelper.material as import("three").Material).transparent = true;
      (gridHelper.material as import("three").Material).opacity = 0.035;
      gridHelper.position.y = -5;
      scene.add(gridHelper);

      // ── Candlestick line chart (3D) ───────────────────────────────
      const chartPoints: import("three").Vector3[] = [];
      for (let i = 0; i < 16; i++) {
        chartPoints.push(new THREE.Vector3(
          -7 + i * 0.95,
          -1.5 + (Math.random() - 0.5) * 3.5,
          -3
        ));
      }
      const chartGeo = new THREE.BufferGeometry().setFromPoints(chartPoints);
      const chartLine = new THREE.Line(
        chartGeo,
        new THREE.LineBasicMaterial({ color: 0xC9A227, transparent: true, opacity: 0.1 })
      );
      scene.add(chartLine);

      // ── Animation loop ────────────────────────────────────────────
      let t = 0;
      const posAttr = pGeo.attributes.position as import("three").BufferAttribute;

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        t += 0.008;

        // Move particles gently
        for (let i = 0; i < N; i++) {
          (posAttr.array as Float32Array)[i * 3]     += velocities[i * 3];
          (posAttr.array as Float32Array)[i * 3 + 1] += velocities[i * 3 + 1];
          (posAttr.array as Float32Array)[i * 3 + 2] += velocities[i * 3 + 2];
          // Wrap around
          if (Math.abs((posAttr.array as Float32Array)[i * 3])     > 10) velocities[i * 3]     *= -1;
          if (Math.abs((posAttr.array as Float32Array)[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
          if (Math.abs((posAttr.array as Float32Array)[i * 3 + 2]) > 6)  velocities[i * 3 + 2] *= -1;
        }
        posAttr.needsUpdate = true;

        // Rotate scene objects
        particleSystem.rotation.y += 0.0005;
        particleSystem.rotation.x = Math.sin(t * 0.2) * 0.04;

        icosa.rotation.y += 0.0018;
        icosa.rotation.x += 0.0009;

        outer.rotation.y -= 0.0004;
        outer.rotation.z += 0.0003;

        octa.rotation.y += 0.001;
        octa.rotation.z -= 0.0007;

        torus1.rotation.z += 0.004;
        torus2.rotation.y += 0.002;
        torus2.rotation.x = Math.PI / 4 + Math.sin(t * 0.25) * 0.08;

        torus3.rotation.x += 0.006;
        torus3.rotation.z += 0.004;

        gridHelper.position.z = Math.sin(t * 0.15) * 0.3;

        renderer.render(scene, camera);
      };
      animate();

      // ── Resize ────────────────────────────────────────────────────
      const onResize = () => {
        const nW = window.innerWidth, nH = window.innerHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener("resize", onResize, { passive: true });

      // Store cleanup in the ref flag
      container.dataset.cleanup = "true";
      (container as HTMLDivElement & { _threeCleanup?: () => void })._threeCleanup = () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        icosaGeo.dispose(); icosaEdges.dispose();
        outerGeo.dispose(); outerEdges.dispose();
        octaGeo.dispose();  octaEdges.dispose();
        pGeo.dispose(); pMat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      const cleanup = (container as HTMLDivElement & { _threeCleanup?: () => void })._threeCleanup;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
