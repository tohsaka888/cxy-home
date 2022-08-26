import { useEffect, useRef, useState } from "react";
import { Container } from "./index.styled";
import { randomEffect } from "utils/randomEffect";

export default function StarBackground() {
  const vantaRef = useRef<HTMLDivElement>(null!);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(() => randomEffect(vantaRef.current));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <Container ref={vantaRef} />
  );
}
