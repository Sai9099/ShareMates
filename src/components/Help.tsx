import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronRight, MessageCircle, Mail, Phone, Book } from 'lucide-react';
import { User as UserType } from '../App';

interface HelpProps {
  user: UserType;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const Help: React.FC<HelpProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I add a new roommate?',
      answer: 'To add a new roommate, go to the Roommates section and click on "Add Roommate". Enter their email address and send an invitation. They will receive an email to join your shared space.',
      category: 'roommates'
    },
    {
      id: '2',
      question: 'How are expenses split among roommates?',
      answer: 'Expenses are automatically split equally among selected roommates by default. You can also customize the split by specifying different amounts for each person when adding an expense.',
      category: 'expenses'
    },
    {
      id: '3',
      question: 'Can I assign chores to specific roommates?',
      answer: 'Yes! In the Chore Assignments section, you can create new chores and assign them to specific roommates. You can also set due dates, priorities, and recurring schedules.',
      category: 'chores'
    },
    {
      id: '4',
      question: 'How do I find compatible roommates?',
      answer: 'Use our Find Roommates feature to browse profiles based on your preferences like budget, location, lifestyle, and interests. Our compatibility algorithm helps match you with suitable roommates.',
      category: 'roommates'
    },
    {
      id: '5',
      question: 'What payment methods are supported?',
      answer: 'ShareMates supports various payment methods including UPI, credit/debit cards, net banking, and digital wallets. You can add and manage your payment methods in Settings.',
      category: 'payments'
    },
    {
      id: '6',
      question: 'How do I track my payment history?',
      answer: 'Go to the Bills Paid section to view all your completed payments. You can filter by category, download receipts, and export your payment history for record-keeping.',
      category: 'payments'
    },
    {
      id: '7',
      question: 'Can I set up recurring expenses?',
      answer: 'Yes, when adding an expense, you can set it as recurring (weekly, monthly, or custom intervals). The system will automatically create new expense entries based on your schedule.',
      category: 'expenses'
    },
    {
      id: '8',
      question: 'How do I change my profile information?',
      answer: 'Visit your Profile section and click "Edit Profile". You can update your personal information, interests, living preferences, and profile picture.',
      category: 'account'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'roommates', name: 'Roommates' },
    { id: 'expenses', name: 'Expenses' },
    { id: 'chores', name: 'Chores' },
    { id: 'payments', name: 'Payments' },
    { id: 'account', name: 'Account' }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Find answers to common questions and get help with ShareMates.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
            Start Chat
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 text-sm mb-4">Send us an email and we'll respond within 24 hours</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
            Send Email
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 text-sm mb-4">Call us for urgent issues</p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm">
            Call Now
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for help topics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Book className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="p-6">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between text-left hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center flex-1">
                  <HelpCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedFAQ === faq.id && (
                <div className="mt-4 ml-8">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {categories.find(c => c.id === faq.category)?.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="p-12 text-center">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Still need help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-900 mb-1">Email Support</p>
            <p>support@sharemates.com</p>
            <p>Response time: Within 24 hours</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">Phone Support</p>
            <p>+91 1800-123-4567</p>
            <p>Available: Mon-Fri, 9 AM - 6 PM IST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;