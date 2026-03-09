export default function Footer() {
  return (
    <footer className="bg-cream dark:bg-zinc-900 pt-20 pb-10 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif tracking-widest uppercase mb-6 dark:text-white">LUXE</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Curadoria exclusiva de fragrâncias raras e joias atemporais. 
              Sua jornada para a elegância começa aqui.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-6 dark:text-white">Navegação</h3>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/perfumes" className="hover:text-gold transition-luxury">Perfumes</a></li>
              <li><a href="/joias" className="hover:text-gold transition-luxury">Semi-Joias</a></li>
              <li><a href="/quiz" className="hover:text-gold transition-luxury">Quiz</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-6 dark:text-white">Suporte</h3>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gold transition-luxury">WhatsApp</a></li>
              <li><a href="#" className="hover:text-gold transition-luxury">Envios</a></li>
              <li><a href="#" className="hover:text-gold transition-luxury">Garantia</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:row justify-between items-center text-[10px] tracking-widest uppercase text-gray-400">
          <p>© 2026 LUXE SHOWROOM. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="hover:text-gold cursor-pointer transition-colors">INSTAGRAM</span>
            <span className="hover:text-gold cursor-pointer transition-colors">FACEBOOK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
