export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-neutral-300">
      <h1 className="text-4xl font-extrabold text-white mb-8">Privacy Policy</h1>
      <p className="mb-6">Last updated: April 2026</p>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
        <p className="leading-relaxed">
          Welcome to VideoTube. We respect your privacy and want to protect your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
        <p className="leading-relaxed">
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Identity Data: username, full name.</li>
          <li>Contact Data: email address.</li>
          <li>Technical Data: IP address, browser type and version, time zone setting and location.</li>
          <li>Usage Data: information about how you use our website, products and services.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
        <p className="leading-relaxed">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
        <p className="leading-relaxed">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
        </p>
      </section>
    </div>
  );
}
