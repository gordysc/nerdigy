import { Footer } from "@/components/layout/footer";
import { LegalHeader } from "@/components/layout/legal-header";

export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col">
      <LegalHeader />
      <div className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <p className="text-muted-foreground mb-8">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <p className="mb-4">
            These Terms of Service ("Terms") govern your use of our website and services operated by Acme Inc. ("Company", "we", "our", or "us"). Our services are offered subject to your acceptance without modification of all of the terms and conditions contained herein.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily access and use our services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on our website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
          <p className="mb-4">
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. Account Registration</h2>
          <p className="mb-4">
            To access certain features of our service, you may be required to register for an account. When you register for an account, you agree to:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Immediately notify us of any unauthorized use of your account</li>
          </ul>
          <p className="mb-4">
            You must be at least 13 years old to use our service. By registering for an account, you represent and warrant that you meet this age requirement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. User Content</h2>
          <p className="mb-4">
            Our service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for Content that you post on or through the service, including its legality, reliability, and appropriateness.
          </p>
          <p className="mb-4">
            By posting Content on or through the service, you represent and warrant that:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Content is yours (you own it) and/or you have the right to use it</li>
            <li>Your use of the Content does not infringe upon or violate the rights of any third party</li>
            <li>Content does not contain viruses, malware, or other harmful components</li>
            <li>Content does not violate any applicable laws or regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. Prohibited Uses</h2>
          <p className="mb-4">
            You may not use our service:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To collect or track the personal information of others</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>For any obscene or immoral purpose</li>
            <li>To interfere with or circumvent the security features of the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Intellectual Property Rights</h2>
          <p className="mb-4">
            The service and its original content, features, and functionality are and will remain the exclusive property of Acme Inc. and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. Privacy Policy</h2>
          <p className="mb-4">
            Your use of our service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
          <p className="mb-4">
            If you wish to terminate your account, you may simply discontinue using the service or contact us to request account deletion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">9. Disclaimer</h2>
          <p className="mb-4">
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, our company:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Excludes all representations and warranties relating to this website and its contents</li>
            <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
          </ul>
          <p className="mb-4">
            This includes, without limitation, direct loss, loss of business or profits (whether or not the loss of such profits was foreseeable, arose in the normal course of things, or you have advised us of the possibility of such potential loss), damage caused to your computer, computer software, systems and programs, and the data thereon.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">10. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Your use or inability to use the service</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from the service</li>
            <li>Any bugs, viruses, trojan horses, or the like that may be transmitted through the service by any third party</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">11. Indemnification</h2>
          <p className="mb-4">
            You agree to defend, indemnify, and hold harmless Acme Inc. and its licensees and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Your use and access of the service</li>
            <li>Your violation of any term of these Terms</li>
            <li>Your violation of any third party right</li>
            <li>Any content that you post or submit through the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">12. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
          <p className="mb-4">
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">13. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
          </p>
          <p className="mb-4">
            By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">14. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="mb-4 rounded-lg bg-muted p-4">
            <p className="font-semibold">Acme Inc.</p>
            <p>Email: legal@acme.com</p>
            <p>Address: 123 Main Street, Suite 100</p>
            <p>City, State 12345</p>
            <p>United States</p>
          </div>
        </section>

        <div className="mt-12 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            By using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}