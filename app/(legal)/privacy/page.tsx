import { Footer } from "@/components/layout/footer";
import { LegalHeader } from "@/components/layout/legal-header";

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col">
      <LegalHeader />
      <div className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Acme Inc. ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
          <p className="mb-4">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
          <h3 className="mb-3 text-xl font-medium">Personal Information</h3>
          <p className="mb-4">
            We collect personal information that you provide to us when you register on the website, including:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Email address</li>
            <li>Username</li>
            <li>Password (encrypted)</li>
            <li>Profile information you choose to provide</li>
          </ul>

          <h3 className="mb-3 text-xl font-medium">Automatically Collected Information</h3>
          <p className="mb-4">
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Time zone setting</li>
            <li>Cookie data</li>
            <li>Pages you visit on our site</li>
            <li>Time and date of your visit</li>
            <li>Time spent on pages</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect or receive:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>To create and manage your account</li>
            <li>To provide, operate, and maintain our website</li>
            <li>To improve, personalize, and expand our website</li>
            <li>To understand and analyze how you use our website</li>
            <li>To develop new products, services, features, and functionality</li>
            <li>To communicate with you for customer service and support</li>
            <li>To send you updates and other administrative information</li>
            <li>To process your transactions and manage your orders</li>
            <li>To prevent fraud and enhance security</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Sharing Your Information</h2>
          <p className="mb-4">
            We may share your information in the following situations:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who perform services for us</li>
            <li><strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent</li>
            <li><strong>Legal Obligations:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. Data Security</h2>
          <p className="mb-4">
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. These measures include:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular backups and disaster recovery procedures</li>
          </ul>
          <p className="mb-4">
            However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Data Retention</h2>
          <p className="mb-4">
            We will retain your personal information only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. Your Privacy Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate personal information</li>
            <li><strong>Erasure:</strong> Request deletion of your personal information</li>
            <li><strong>Data Portability:</strong> Request transfer of your personal information</li>
            <li><strong>Objection:</strong> Object to our processing of your personal information</li>
            <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
            <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our website and store certain information. These technologies include:
          </p>
          <ul className="mb-4 list-disc pl-6">
            <li><strong>Session Cookies:</strong> Used to operate our service and maintain your session</li>
            <li><strong>Preference Cookies:</strong> Used to remember your preferences and settings</li>
            <li><strong>Security Cookies:</strong> Used for security purposes and to detect abuse</li>
          </ul>
          <p className="mb-4">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">9. Children's Privacy</h2>
          <p className="mb-4">
            Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">10. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">11. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">12. Contact Us</h2>
          <p className="mb-4">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <div className="mb-4 rounded-lg bg-muted p-4">
            <p className="font-semibold">Acme Inc.</p>
            <p>Email: privacy@acme.com</p>
            <p>Address: 123 Main Street, Suite 100</p>
            <p>City, State 12345</p>
            <p>United States</p>
          </div>
        </section>

        <div className="mt-12 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            By using our service, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
          </p>
        </div>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}