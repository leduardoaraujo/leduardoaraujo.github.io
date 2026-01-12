const FinalFooter = () => {
  return (
    <section className="relative min-h-[30vh] border-t border-border overflow-hidden">
      {/* Copyright */}
      <div className="relative z-10 h-full flex items-center justify-center py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luiz Eduardo Araujo. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalFooter;
