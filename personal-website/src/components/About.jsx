const About = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '15+', label: 'Technologies' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
              alt="Working on laptop"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-secondary-900 mb-4">
              Crafting Digital Experiences with Passion
            </h3>
            <p className="text-secondary-600 mb-6 leading-relaxed">
              I'm a full-stack developer based in San Francisco with a passion
              for building beautiful, functional, and user-centered digital
              experiences. With 5+ years of experience in the field, I am always
              looking for new and innovative ways to bring my clients' visions
              to life.
            </p>
            <p className="text-secondary-600 mb-8 leading-relaxed">
              I specialize in JavaScript technologies, particularly React and
              Node.js, but I'm always eager to learn new technologies. When I'm
              not coding, you can find me hiking, reading tech blogs, or
              experimenting with new frameworks.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
