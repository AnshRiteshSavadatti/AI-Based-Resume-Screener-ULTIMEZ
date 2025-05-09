function Footer() {
  const className =
    "text-sm text-stone-800 hover:text-blue-500 hover:underline";
  return (
    <footer className="flex flex-col items-center justify-center gap-2 bg-slate-200 p-4 text-center">
      <p className="text-sm text-stone-800">
        &copy; {new Date().getFullYear()} Ultimez{" "}
      </p>
      <p>&copy; Ultimez</p>
      <a href="https://github.com/AnshRiteshSavadatti" className={className}>
        GitHub
      </a>
    </footer>
  );
}

export default Footer;
