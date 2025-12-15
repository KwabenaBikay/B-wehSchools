export default function AboutPage() {
  return (
    // Pushes the content down below the fixed navbar.
    <div className="min-h-screen bg-white pt-40 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          About B-Weh Schools Montessori
        </h1>
        <div className="mt-8 space-y-6 text-sm text-slate-600 sm:text-base">
          <p>
            B-weh School (Montessori) is a private Montessori school aimed to provide the best and quality early childhood education service at a fair price; 
            it gives more attention to quality education service and aims to become a benchmark for the others. 
            B-weh Schools seeks to help society by molding students into reaching their full potential. 
            The school aligns its work and its mission with the Montessori principle, producing competent and ethically well-shaped students. 
            The school works to satisfy the needs of the child's education. 
          </p>
          <p>
            Our goal is to develop a child’s full potential by imparting ethical living practices, developing independent and critical thinkers, and raising kids who champion leadership and innovation. 
            To achieve this, we would use the Montessori approach to education. With the students in mind, we’ll earn all parents’ trust. 
            They will know and see through our example that all we care about is the education and healthy development of their children and they will appreciate that.
          </p>
          <h2 className="mt-8 text-xl font-semibold text-slate-900">
            Our Vision
          </h2>
          <p>
            To provide pre - tertiary and secondary education, aimed at process and results.

          </p>
          <h2 className="mt-8 text-xl font-semibold text-slate-900">
            Our Mission
          </h2>
          <p>
            Helping children reach their full potential while considering their emotional, physical, intellectual, 
            and social development through a nurturing and stimulating environment that is based on the Montessori philosophy.
          </p>
          <h2 className="mt-8 text-xl font-semibold text-slate-900">
            Our Values
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respect for the child and their individual learning journey</li>
            <li>Excellence in education and character development</li>
            <li>Integrity in all our interactions</li>
            <li>Community and collaboration</li>
            <li>Joy in learning and discovery</li>
          </ul>
        </div>
      </div>
    </div>
  );
}