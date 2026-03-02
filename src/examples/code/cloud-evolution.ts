import { RemotionExample } from "./index";

export const cloudEvolutionCode = `import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";

const C = {
  bg: '#050510',
  frontend: '#818cf8',
  backend: '#34d399',
  agent: '#fbbf24',
  minion: '#f472b6',
};

const GridBg = () => (
  <AbsoluteFill style={{
    backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
    backgroundSize: '80px 80px',
  }} />
);

const Node = ({ label, color, x, y, entrance, fs = 24, pd = '14px 28px' }) => (
  <div style={{
    position: 'absolute',
    left: x,
    top: y,
    transform: \`translateX(-50%) translateY(-50%) scale(\${entrance})\`,
    opacity: Math.min(1, entrance),
    backgroundColor: 'rgba(10,10,30,0.95)',
    border: \`2px solid \${color}\`,
    borderRadius: 14,
    padding: pd,
    color,
    fontSize: fs,
    fontFamily: 'system-ui, sans-serif',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    boxShadow: \`0 0 28px \${color}44\`,
    letterSpacing: '0.5px',
  }}>
    {label}
  </div>
);

const Conn = ({ x1, x2, y, color, progress, frame, speed = 1 }) => {
  if (progress <= 0) return null;
  const len = x2 - x1;
  const drawn = len * Math.min(1, progress);
  const t = (frame * speed / 30) % 1;
  const p1x = x1 + len * t;
  const p2x = x1 + len * (1 - t);
  const showP = progress >= 1;
  return (
    <>
      <div style={{
        position: 'absolute',
        left: x1,
        top: y - 1.5,
        width: drawn,
        height: 3,
        backgroundColor: color,
        opacity: 0.65,
        borderRadius: 2,
        boxShadow: \`0 0 8px \${color}\`,
      }} />
      {showP && <div style={{
        position: 'absolute',
        left: p1x - 6,
        top: y - 6,
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: \`0 0 16px \${color}\`,
      }} />}
      {showP && <div style={{
        position: 'absolute',
        left: p2x - 5,
        top: y - 5,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0.7,
        boxShadow: \`0 0 12px \${color}\`,
      }} />}
    </>
  );
};

const Heading = ({ text, sub, entrance }) => (
  <div style={{
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    opacity: entrance,
    transform: \`translateY(\${interpolate(entrance, [0, 1], [24, 0])}px)\`,
    fontFamily: 'system-ui, sans-serif',
    zIndex: 10,
  }}>
    <div style={{ fontSize: 52, fontWeight: 800, color: '#e2e8f0', letterSpacing: '-1px' }}>{text}</div>
    <div style={{ fontSize: 28, color: '#475569', marginTop: 12 }}>{sub}</div>
  </div>
);

const TitleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t1 = spring({ frame, fps, config: { damping: 200 } });
  const t2 = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const t3 = spring({ frame: frame - 38, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: 'center', alignItems: 'center' }}>
      <GridBg />
      <div style={{ textAlign: 'center', fontFamily: 'system-ui', zIndex: 1, padding: '0 80px' }}>
        <div style={{
          fontSize: 88,
          fontWeight: 900,
          color: '#e2e8f0',
          opacity: t1,
          transform: \`scale(\${interpolate(t1, [0, 1], [0.85, 1])})\`,
          letterSpacing: '-3px',
          lineHeight: 1.05,
        }}>
          The Evolution of<br />
          <span style={{ color: C.frontend }}>Cloud Architecture</span>
        </div>
        <div style={{
          fontSize: 30,
          color: '#475569',
          marginTop: 28,
          opacity: t2,
          transform: \`translateY(\${interpolate(t2, [0, 1], [20, 0])}px)\`,
        }}>
          From simple services to intelligent distributed systems
        </div>
        <div style={{ marginTop: 60, display: 'flex', gap: 32, justifyContent: 'center', opacity: t3 }}>
          {[
            { label: 'Era 1', desc: 'Backend ↔ Frontend', color: C.backend },
            { label: 'Era 2', desc: 'AI Agents + Services', color: C.agent },
            { label: 'Era 3', desc: 'Agents + Minions', color: C.minion },
          ].map(({ label, desc, color }) => (
            <div key={label} style={{
              fontSize: 20,
              padding: '12px 28px',
              border: \`1px solid \${color}55\`,
              borderRadius: 12,
              color,
              backgroundColor: \`\${color}11\`,
            }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
              <div style={{ opacity: 0.75, fontSize: 16 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TraditionalScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fi = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const heading = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const n1 = spring({ frame: frame - 18, fps, config: { damping: 12, stiffness: 100 } });
  const n2 = spring({ frame: frame - 35, fps, config: { damping: 12, stiffness: 100 } });
  const connP = interpolate(frame, [58, 105], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const descIn = spring({ frame: frame - 120, fps, config: { damping: 200 } });
  const BX = 640, FX = 1280, CY = 540, NW = 110;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fi }}>
      <GridBg />
      <Heading text="Era 1: Traditional Architecture" sub="Simple request-response web stack" entrance={heading} />
      <Node label="Backend" color={C.backend} x={BX} y={CY} entrance={n1} />
      <Node label="Frontend" color={C.frontend} x={FX} y={CY} entrance={n2} />
      <Conn x1={BX + NW} x2={FX - NW} y={CY} color="#64748b" progress={connP} frame={frame} />
      {descIn > 0.01 && (
        <div style={{
          position: 'absolute', bottom: 160, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'system-ui', opacity: descIn,
          color: '#64748b', fontSize: 26,
        }}>
          REST APIs · HTTP requests · Monolithic services
        </div>
      )}
    </AbsoluteFill>
  );
};

const AgentsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fi = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const heading = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const xs = [320, 747, 1173, 1600];
  const labels = ['AI Agents', 'Backend', 'Frontend', 'Agents'];
  const colors = [C.agent, C.backend, C.frontend, C.agent];
  const connColors = [C.agent, '#475569', C.agent];
  const NW = 110, CY = 540;
  const entrances = [15, 28, 42, 56].map(d =>
    spring({ frame: frame - d, fps, config: { damping: 12, stiffness: 100 } })
  );
  const connPs = [70, 85, 100].map(start =>
    interpolate(frame, [start, start + 45], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
  );
  const descIn = spring({ frame: frame - 155, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fi }}>
      <GridBg />
      <Heading text="Era 2: AI Agents Integration" sub="Intelligent agents join the architecture" entrance={heading} />
      {xs.map((x, i) => (
        <Node key={i} label={labels[i]} color={colors[i]} x={x} y={CY} entrance={entrances[i]} />
      ))}
      {connPs.map((p, i) => (
        <Conn key={i} x1={xs[i] + NW} x2={xs[i + 1] - NW} y={CY} color={connColors[i]} progress={p} frame={frame} />
      ))}
      {descIn > 0.01 && (
        <div style={{
          position: 'absolute', bottom: 140, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'system-ui', opacity: descIn,
          color: '#64748b', fontSize: 26,
        }}>
          Agents query backends · LLM-powered decisions · Growing complexity
        </div>
      )}
    </AbsoluteFill>
  );
};

const AntigravityScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fi = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const heading = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const xs = [185, 495, 805, 1115, 1425, 1735];
  const labels = ['AI Agents', 'Minions', 'Backend', 'Frontend', 'Minions', 'Agents'];
  const colors = [C.agent, C.minion, C.backend, C.frontend, C.minion, C.agent];
  const connColors = [C.minion, C.minion, '#475569', C.minion, C.minion];
  const NW = 95, CY = 520;
  const entrances = [12, 24, 36, 48, 60, 72].map(d =>
    spring({ frame: frame - d, fps, config: { damping: 12, stiffness: 100 } })
  );
  const connPs = [84, 96, 108, 120, 132].map(start =>
    interpolate(frame, [start, start + 45], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
  );
  const subIn = spring({ frame: frame - 190, fps, config: { damping: 200 } });
  const tagIn = spring({ frame: frame - 215, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fi }}>
      <GridBg />
      <Heading text="Era 3: Antigravity Architecture" sub="Minions orchestrate the intelligent layer" entrance={heading} />
      {xs.map((x, i) => (
        <Node key={i} label={labels[i]} color={colors[i]} x={x} y={CY} entrance={entrances[i]} fs={21} pd="12px 24px" />
      ))}
      {connPs.map((p, i) => (
        <Conn key={i} x1={xs[i] + NW} x2={xs[i + 1] - NW} y={CY} color={connColors[i]} progress={p} frame={frame} speed={1.5} />
      ))}
      {subIn > 0.01 && <>
        <div style={{
          position: 'absolute',
          left: xs[1],
          top: CY + 78,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: 'system-ui',
          fontSize: 17,
          color: C.minion,
          opacity: subIn * 0.85,
          fontWeight: 600,
        }}>Orchestrates AI ↔ Services</div>
        <div style={{
          position: 'absolute',
          left: xs[4],
          top: CY + 78,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: 'system-ui',
          fontSize: 17,
          color: C.minion,
          opacity: subIn * 0.85,
          fontWeight: 600,
        }}>Bridges Frontend ↔ Agents</div>
      </>}
      {tagIn > 0.01 && (
        <div style={{
          position: 'absolute', bottom: 90, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'system-ui', opacity: tagIn,
        }}>
          <div style={{ fontSize: 34, color: C.minion, fontWeight: 700, marginBottom: 10 }}>
            Minions: The intelligence layer between AI and services
          </div>
          <div style={{ fontSize: 22, color: '#475569' }}>
            Lightweight agents coordinating AI systems with traditional infrastructure
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export const MyAnimation = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={120} premountFor={30}>
        <TitleScene />
      </Sequence>
      <Sequence from={120} durationInFrames={300} premountFor={30}>
        <TraditionalScene />
      </Sequence>
      <Sequence from={420} durationInFrames={300} premountFor={30}>
        <AgentsScene />
      </Sequence>
      <Sequence from={720} durationInFrames={390} premountFor={30}>
        <AntigravityScene />
      </Sequence>
    </AbsoluteFill>
  );
};`;

export const cloudEvolutionExample: RemotionExample = {
  id: "cloud-evolution",
  name: "Cloud Architecture Evolution",
  description:
    "Animated explainer: Traditional → AI Agents → Antigravity (Agents + Minions) architecture",
  category: "Other",
  durationInFrames: 1110,
  fps: 30,
  code: cloudEvolutionCode,
};
