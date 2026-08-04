import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ProductCutoutScene({ image, alt }) {
  const mountRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let frameId = 0;
    let disposed = false;
    let mesh = null;
    let texture = null;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20);
    camera.position.z = 6;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setFallback(true);
      return undefined;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const resize = () => {
      if (!mount || !renderer) return;
      const { width, height } = mount.getBoundingClientRect();
      const safeWidth = Math.max(1, width);
      const safeHeight = Math.max(1, height);
      renderer.setSize(safeWidth, safeHeight, false);

      const aspect = safeWidth / safeHeight;
      const frustumHeight = 3;
      camera.left = (-frustumHeight * aspect) / 2;
      camera.right = (frustumHeight * aspect) / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
    };

    const loader = new THREE.TextureLoader();
    loader.load(
      image,
      (loadedTexture) => {
        if (disposed) {
          loadedTexture.dispose();
          return;
        }

        texture = loadedTexture;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const textureAspect = texture.image.width / texture.image.height;
        const productHeight = 2.68;
        const productWidth = productHeight * textureAspect;

        const geometry = new THREE.PlaneGeometry(productWidth, productHeight, 1, 1);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.02,
          side: THREE.DoubleSide,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -0.03, 0);
        mesh.rotation.y = -0.14;
        scene.add(mesh);
      },
      undefined,
      () => {
        if (!disposed) setFallback(true);
      },
    );

    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      if (mesh) {
        mesh.rotation.y = -0.13 + Math.sin(t * 0.72) * 0.045;
        mesh.rotation.x = Math.sin(t * 0.54) * 0.018;
        mesh.position.y = -0.03 + Math.sin(t * 0.86) * 0.025;
      }
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      });
      if (texture) texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [image]);

  if (fallback) {
    return <img className="hero-product-cutout-fallback" src={image} alt={alt} loading="eager" decoding="async" />;
  }

  return <span className="hero-product-cutout-canvas" ref={mountRef} aria-hidden="true" />;
}
