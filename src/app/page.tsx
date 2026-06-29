import AnimatedBackground from "@/components/AnimatedBackground";
import ProfileHeader from "@/components/ProfileHeader";
import SocialButton from "@/components/SocialButton";
import Footer from "@/components/Footer";
import ThreeSceneLoader from "@/components/ThreeSceneLoader";
import { SOCIAL_LINKS } from "@/data/links";

export default function Home() {
  return (
    <main dir="rtl" className="relative min-h-dvh flex justify-center overflow-x-hidden">
      <AnimatedBackground />
      <ThreeSceneLoader />

      <div className="relative z-10 flex flex-col w-full px-4 py-10 gap-7" style={{ maxWidth: 460 }}>
        <ProfileHeader />
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(201,162,39,.18),transparent)" }} aria-hidden="true" />
        <nav className="flex flex-col gap-3" aria-label="روابط دانار كابيتال">
          {SOCIAL_LINKS.map((link, i) => (
            <SocialButton key={link.id} link={link} index={i} />
          ))}
        </nav>
        <Footer />
      </div>
    </main>
  );
}
