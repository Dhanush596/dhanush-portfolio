export interface AssetManifestItem {
  id: string;
  title: string;
  path: string;
  type: 'video' | 'image';
  aspectRatio: '16:9' | '9:16' | '4:3' | '1:1';
  description: string;
  ready: boolean;
  duration?: string;
}

export const MEDIA_ASSETS: Record<string, AssetManifestItem> = {
  // Motion Reel Clips
  'clip-terraform-apply': {
    id: 'clip-terraform-apply',
    title: 'Terraform Infrastructure Provisioning',
    path: '/clips/clip-01-terraform-apply.mp4',
    type: 'video',
    aspectRatio: '16:9',
    description: 'Terminal recording running terraform apply on AWS EC2 & K3s cluster nodes.',
    ready: false,
    duration: '00:08',
  },
  'clip-argocd-sync': {
    id: 'clip-argocd-sync',
    title: 'ArgoCD GitOps Sync Tree',
    path: '/clips/clip-02-argocd-sync.mp4',
    type: 'video',
    aspectRatio: '16:9',
    description: 'ArgoCD web console self-healing sync tree turning healthy and green across services.',
    ready: false,
    duration: '00:07',
  },
  'clip-github-trivy': {
    id: 'clip-github-trivy',
    title: 'GitHub Actions & Trivy Scanning',
    path: '/clips/clip-03-github-trivy.mp4',
    type: 'video',
    aspectRatio: '16:9',
    description: 'CI/CD pipeline workflow executing lint, tests, and Trivy security scanning before container build.',
    ready: false,
    duration: '00:09',
  },
  'clip-marichin-booking': {
    id: 'clip-marichin-booking',
    title: 'Marichin Homestay Booking Flow',
    path: '/clips/clip-04-marichin-booking.mp4',
    type: 'video',
    aspectRatio: '9:16',
    description: 'Interactive room availability and reservation flow on Marichin Homestay web app.',
    ready: false,
    duration: '00:08',
  },
  'clip-kalyanothsava': {
    id: 'clip-kalyanothsava',
    title: 'Karnataka Kalyanothsava Portal',
    path: '/clips/clip-05-kalyanothsava.mp4',
    type: 'video',
    aspectRatio: '16:9',
    description: 'Matrimonial registration and community matchmaking portal navigation.',
    ready: false,
    duration: '00:06',
  },
  'clip-alankar-catalog': {
    id: 'clip-alankar-catalog',
    title: 'Alankar Fashion E-Commerce Flow',
    path: '/clips/clip-06-alankar-catalog.mp4',
    type: 'video',
    aspectRatio: '9:16',
    description: 'Product catalog filtering, cart interaction, and checkout UX on Alankar Fashion.',
    ready: false,
    duration: '00:07',
  },
  'clip-bangalore-vibes': {
    id: 'clip-bangalore-vibes',
    title: 'Bangalore Vibes Media Directory',
    path: '/clips/clip-07-bangalore-vibes.mp4',
    type: 'video',
    aspectRatio: '16:9',
    description: 'Nightlife, city events, and entertainment directory navigation on Bangalore Vibes.',
    ready: false,
    duration: '00:08',
  },
  'clip-shader-hero': {
    id: 'clip-shader-hero',
    title: 'WebGL Touch-Sensor Shader',
    path: '/clips/clip-08-shader-hero.mp4',
    type: 'video',
    aspectRatio: '16:9',
    description: 'Three.js interactive wave deformation reacting dynamically to high-speed cursor gestures.',
    ready: false,
    duration: '00:06',
  },

  // Live Sites Browser Chrome Media
  'site-marichin-homestay': {
    id: 'site-marichin-homestay',
    title: 'Marichin Homestay Production Site',
    path: '/media/sites/marichin-homestay.webp',
    type: 'image',
    aspectRatio: '16:9',
    description: 'High-res desktop screenshot of Marichin Homestay live booking portal (1440x900).',
    ready: false,
  },
  'site-karnataka-kalyanothsava': {
    id: 'site-karnataka-kalyanothsava',
    title: 'Karnataka Kalyanothsava Platform',
    path: '/media/sites/karnataka-kalyanothsava.webp',
    type: 'image',
    aspectRatio: '16:9',
    description: 'High-res desktop screenshot of Karnataka Kalyanothsava matrimony site (1440x900).',
    ready: false,
  },
  'site-alankar-fashion': {
    id: 'site-alankar-fashion',
    title: 'Alankar Fashion E-Commerce',
    path: '/media/sites/alankar-fashion.webp',
    type: 'image',
    aspectRatio: '16:9',
    description: 'High-res desktop screenshot of Alankar Fashion retail store (1440x900).',
    ready: false,
  },
  'site-bangalore-vibes': {
    id: 'site-bangalore-vibes',
    title: 'Bangalore Vibes City Directory',
    path: '/media/sites/bangalore-vibes.webp',
    type: 'image',
    aspectRatio: '16:9',
    description: 'High-res desktop screenshot of Bangalore Vibes entertainment portal (1440x900).',
    ready: false,
  },

  // Polaroids / About Stickers
  'polaroid-journey': {
    id: 'polaroid-journey',
    title: 'Kasaragod → Mangalore → Bangalore',
    path: '/media/polaroid-journey.webp',
    type: 'image',
    aspectRatio: '1:1',
    description: 'Draggable memory card showing migration timeline from Kasaragod to Bangalore.',
    ready: false,
  },
  'polaroid-mca': {
    id: 'polaroid-mca',
    title: 'MCA 2026 Grad',
    path: '/media/polaroid-mca.webp',
    type: 'image',
    aspectRatio: '1:1',
    description: 'Draggable badge highlighting MCA specialization in Cloud-Native & AI at SIT Mangalore.',
    ready: false,
  },
  'polaroid-devops': {
    id: 'polaroid-devops',
    title: '100/100 DevOps Honor',
    path: '/media/polaroid-devops.webp',
    type: 'image',
    aspectRatio: '1:1',
    description: 'Draggable polaroid celebrating the 100/100 score at Rooman Technologies.',
    ready: false,
  },
};
