import AuthLayout from "../components/AuthLayout";
import KidSignupForm from "../components/KidSignupForm";

export default function KidSignup() {
  return (
    <AuthLayout
      badge="For Kids"
      heading={
        <>
          Join the{" "}
          <span className="text-primary relative inline-block">
            adventure!
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40"
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </span>
        </>
      }
      subtitle="Unlock games, badges, and make new friends in a safe place."
      images={[
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjD3oMm2Z7-enK-2LECLXY-xptfF6QbDVYhi91csmwo8M4a6-uAYTkeXnR0gkXjENsiD7sRbRPq0Pp8iJTWy8Bwz8NAUgZRRnsgklG9UY0oEwouEyxt4k0ilZZtNXzATIU1kM5WpIQSK4VV6tu6Avq50kzkDibCHUlYWhugtCPisrmOyKWQ84AjDveAi6gPqsZUqA8G_XGVZUa4y4zyxqmDDsQgxTIcpnN8SSkhVfnAhcw2Srverh2BGhJje1U1juYkVG-1XDJA4v5",
          alt: "Happy kid wearing superhero cape",
          label: "Adventure",
        },
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNDQ7YPazIUD5AzN3KgHZPRFct_CFs2rMvsFchcCqMPxX2QkAim53iqt8tukvmTzVMMRCeClPTtFThk660ukFmiYg7hHC3tNBwPCk19fPpx24yrZL-1eiBkZIto7jBkGWosKxfFh3lux9olUQuUwnqkxJN5aJHYWcJPnUZIFCYzjbBffUtjP6Q_XSjoQ_X0yatZoVi4wNflk9VwNeFM3qcgJ9i9kh9NT3JWCVvbCttgoxMEyHBfE2ZdF35M4Rj3ItioBEWc2tDZ1_2",
          alt: "Kids playing together",
          label: "Friendship",
          offset: true,
        },
      ]}
      socialProof="500+ kids already on their adventure"
    >
      <KidSignupForm />
    </AuthLayout>
  );
}
