import { ImageResponse } from 'next/og';

export const alt = 'Dhanush A | Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#05060A',
          padding: '80px',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#22D3EE',
            }}
          />
          <span
            style={{
              color: '#22D3EE',
              fontSize: '24px',
              fontFamily: 'sans-serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Portfolio & Systems
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: '68px',
              fontWeight: 800,
              color: '#F8FAFC',
              lineHeight: 1.1,
              fontFamily: 'sans-serif',
              margin: 0,
            }}
          >
            Dhanush A
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#94A3B8',
              lineHeight: 1.4,
              fontFamily: 'sans-serif',
              margin: 0,
              maxWidth: '900px',
            }}
          >
            I build full-stack web apps and the cloud pipelines that ship them.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {['React', 'Node.js', 'Docker', 'Kubernetes', 'Terraform', 'Next.js'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#E2E8F0',
                  fontSize: '20px',
                  fontFamily: 'sans-serif',
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
