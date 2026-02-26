import kidspirationLogo from "../assets/kidspiration-logo.png"

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e6e2d6] dark:border-slate-800 bg-[#f4f0e7] dark:bg-background-dark py-12 px-4 md:px-10">
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-text-main dark:text-white">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-slate-900">
              <img src={kidspirationLogo} alt="kidspiration-logo" />
            </div>
            <h2 className="text-lg font-bold">Kidspiration</h2>
          </div>
          <p className="text-sm text-text-muted dark:text-slate-400 max-w-xs">
            Discover the joy of faith through inspiring Bible stories, fun activities, and exciting adventures designed to help kids grow in God's love.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white">Explore</h4>
          <a
            className="text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Videos
          </a>
          <a
            className="text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Games
          </a>
          <a
            className="text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Activities
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white">About</h4>
          <a
            className="text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Parents Guide
          </a>
          <a
            className="text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Our Mission
          </a>
          <a
            className="text-sm text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Contact Us
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white">
            Follow Us
          </h4>
          <div className="flex gap-4">
            <a
              className="text-text-muted dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="sr-only">Facebook</span>
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              className="text-text-muted dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <span className="sr-only">Instagram</span>
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clip-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.15 2.06c.636-.247 1.363-.416 2.427-.465C7.673 2.013 8.044 2 10.5 2h1.815zm-1.815 1.838h-1.5c-2.4 0-2.74.01-3.66.053-.918.043-1.417.182-1.75.311a3.098 3.098 0 00-1.128.733 3.098 3.098 0 00-.733 1.128c-.129.333-.268.832-.311 1.75-.043.92-.053 1.259-.053 3.66v1.5c0 2.4.01 2.74.053 3.66.043.918.182 1.417.311 1.75.195.503.46.914.805 1.258.344.345.755.61 1.258.805.333.129.832.268 1.75.311.92.043 1.259.053 3.66.053h1.5c2.4 0 2.74-.01 3.66-.053.918-.043 1.417-.182 1.75-.311a3.098 3.098 0 001.128-.733 3.098 3.098 0 00.733-1.128c.129-.333.268-.832.311-1.75.043-.92.053-1.259.053-3.66v-1.5c0-2.4-.01-2.74-.053-3.66-.043-.918-.182-1.417-.311-1.75a3.098 3.098 0 00-.805-1.258 3.098 3.098 0 00-1.258-.805c-.333-.129-.832-.268-1.75-.311-.92-.043-1.259-.053-3.66-.053zm3.75 4.875c1.45 0 2.625 1.175 2.625 2.625s-1.175 2.625-2.625 2.625-2.625-1.175-2.625-2.625 1.175-2.625 2.625-2.625zm0 1.5c.621 0 1.125.504 1.125 1.125s-.504 1.125-1.125 1.125-1.125-.504-1.125-1.125.504-1.125 1.125-1.125zm3.75-4.5a.75.75 0 110 1.5.75.75 0 010-1.5z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] mt-12 pt-8 border-t border-[#e6e2d6] dark:border-slate-800 text-center text-sm text-text-muted dark:text-slate-500">
        © {new Date().getFullYear()} Kidspiration. All rights reserved.
      </div>
    </footer>
  );
}
