import React from 'react';

const FAQSection = () => {
  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold text-center text-[#EDEDED] mb-6">
        Importance & FAQs
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300"
        >
          <div className="collapse-title text-lg font-medium text-[#F5F5F5]">
            Why is this platform important?
          </div>
          <div className="collapse-content text-[#D1D5DB]">
            <p>
              This platform offers a realistic test interface, analytics, and
              tools to improve your preparation.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300"
        >
          <div className="collapse-title text-lg font-medium text-[#F5F5F5]">
            How to access test history?
          </div>
          <div className="collapse-content text-[#D1D5DB]">
            <p>
              Log in to your account and navigate to the Test History section in
              your dashboard.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300"
        >
          <div className="collapse-title text-lg font-medium text-[#F5F5F5]">
            Is this platform free to use?
          </div>
          <div className="collapse-content text-[#D1D5DB]">
            <p>
              Yes, this platform is completely free for students to use and
              enhance their exam preparation.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300"
        >
          <div className="collapse-title text-lg font-medium text-[#F5F5F5]">
            Can I bookmark questions for later review?
          </div>
          <div className="collapse-content text-[#D1D5DB]">
            <p>
              Absolutely! You can bookmark important questions and access them
              anytime from your dashboard.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300"
        >
          <div className="collapse-title text-lg font-medium text-[#F5F5F5]">
            How often are new tests added?
          </div>
          <div className="collapse-content text-[#D1D5DB]">
            <p>
              New tests are added regularly based on the latest syllabus and
              exam patterns.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300"
        >
          <div className="collapse-title text-lg font-medium text-[#F5F5F5]">
            Is the platform mobile-friendly?
          </div>
          <div className="collapse-content text-[#D1D5DB]">
            <p>
              Yes, the platform is designed to be fully responsive and works
              seamlessly on all devices.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300"
        >
          <div className="collapse-title text-lg font-medium text-[#F5F5F5]">
            Can I get detailed performance analysis for each test?
          </div>
          <div className="collapse-content text-[#D1D5DB]">
            <p>
              Yes, after completing a test, you can view a detailed performance
              analysis, including subject-wise and topic-wise insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
