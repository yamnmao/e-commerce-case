"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

//const array of questions and answers
const faqs = [
  { question: 'What is Next.js?', answer: 'Next.js is a React framework for building web applications.' },
  { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
  { question: 'What is the purpose of getStaticProps?', answer: 'getStaticProps is used to fetch data at build time in Next.js.' },
  { question: 'What are React hooks?', answer: 'React hooks are functions that let you use state and other React features in functional components.' },
  { question: 'What is server-side rendering?', answer: 'Server-side rendering is the ability of an application to contribute by displaying the web page on the server instead of rendering it in the browser.' },
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const router = useRouter();

  //Search bar
  useEffect(() => {
    const query = router.query?.search || '';
    setSearchTerm(query);
  }, [router?.query?.search]);

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.push(`/faq?search=${encodeURIComponent(value)}`, undefined, { shallow: true });
  };

  //toggle Item
  const toggleItem = (index) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  //Expand all faq
  const expandAll = () => {
    const allExpanded = filteredFAQs.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {});
    setExpandedItems(allExpanded);
  };

  const collapseAll = () => {
    setExpandedItems({});
  };



  return (
    <div className="h-full w-full max-w-screen-xl mx-auto px-2.5 md:px-20 pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32
        lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex justify-between">
          <button onClick={expandAll} className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">Expand All</button>
          <button onClick={collapseAll} className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600">Collapse All</button>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left px-6 py-4 font-medium text-gray-900 focus:outline-none"
              >
                {faq.question}
                <span className="float-right">{expandedItems[index] ? '−' : '+'}</span>
              </button>
              {expandedItems[index] && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
            </div>
              )}
            </div>
          ))}
        </div>
      </div>

  );
}