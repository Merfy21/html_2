import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { 
  LayoutDashboard, 
  History, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Bot, 
  ArrowRight, 
  Search,
  Smartphone,
  Menu,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { DAU_DATA, REVENUE_DATA, AnalysisTopic } from './types';
import { generateAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analysis'>('dashboard');
  const [aiTopic, setAiTopic] = useState<AnalysisTopic>(AnalysisTopic.HISTORY);
  const [aiContent, setAiContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initial fetch for analysis if empty
  useEffect(() => {
    if (activeTab === 'analysis' && !aiContent) {
      handleGenerateAnalysis(AnalysisTopic.HISTORY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleGenerateAnalysis = async (topic: AnalysisTopic) => {
    setAiTopic(topic);
    setLoading(true);
    setAiContent(""); // Clear previous content to show loading state
    try {
      const result = await generateAnalysis(topic);
      setAiContent(result);
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: 'dashboard' | 'analysis', label: string, icon: any }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center w-full gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === id 
          ? 'bg-orange-50 text-orange-600' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white fixed inset-y-0 z-50">
        <div className="p-6 flex items-center gap-2 border-b border-slate-100">
          <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            K
          </div>
          <span className="font-bold text-lg tracking-tight">Kuaishou Insight</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <TabButton id="dashboard" label="Overview Dashboard" icon={LayoutDashboard} />
          <TabButton id="analysis" label="AI Deep Dive" icon={Bot} />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Powered by</h4>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Bot size={16} className="text-blue-500" /> Gemini 2.5 Flash
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">K</div>
          <span className="font-bold text-lg">Insight</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-4">
          <nav className="space-y-2">
            <TabButton id="dashboard" label="Overview Dashboard" icon={LayoutDashboard} />
            <TabButton id="analysis" label="AI Deep Dive" icon={Bot} />
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="max-w-6xl mx-auto p-6 md:p-8">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Overview</h1>
                <p className="text-slate-500 mt-2">Key metrics and growth trajectory of Kuaishou Technology.</p>
              </header>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Daily Active Users (2023)</p>
                      <h3 className="text-2xl font-bold">383 Million</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Total Revenue (2023)</p>
                      <h3 className="text-2xl font-bold">¥113.5 Billion</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Primary App</p>
                      <h3 className="text-2xl font-bold">Kuaishou App</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                      <History size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Founded</p>
                      <h3 className="text-2xl font-bold">2011</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-[400px] flex flex-col">
                  <CardHeader>
                    <CardTitle>User Growth (DAU)</CardTitle>
                    <CardDescription>Daily Active Users in Millions (2017-2023)</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={DAU_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}M`} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ color: '#f97316' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: "#f97316" }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="h-[400px] flex flex-col">
                  <CardHeader>
                    <CardTitle>Revenue Growth</CardTitle>
                    <CardDescription>Total Revenue in Billion RMB (2017-2023)</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `¥${value}B`} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          cursor={{ fill: '#f1f5f9' }}
                        />
                        <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Timeline Teaser */}
              <Card>
                <CardHeader>
                  <CardTitle>Development Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 border-l-2 border-slate-200 ml-2 pl-6 relative">
                    {[
                      { year: "2011", title: "GIF Kuaishou", desc: "Launched as a utility app for creating GIFs." },
                      { year: "2013", title: "Pivot to Video", desc: "Transformed into a short-video social platform." },
                      { year: "2016", title: "Live Streaming", desc: "Launched live streaming feature, becoming a major revenue driver." },
                      { year: "2021", title: "IPO", desc: "Listed on HKEX (Stock Code: 1024)." }
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-white border-2 border-orange-500 block"></span>
                        <h4 className="text-sm font-bold text-slate-900">{item.year}</h4>
                        <h5 className="text-base font-semibold text-slate-800">{item.title}</h5>
                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                     <Button 
                       variant="secondary" 
                       className="w-full sm:w-auto gap-2"
                       onClick={() => {
                         setActiveTab('analysis');
                         handleGenerateAnalysis(AnalysisTopic.HISTORY);
                       }}
                     >
                       Get Detailed AI History Analysis <ArrowRight size={16} />
                     </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analysis' && (
             <div className="animate-in slide-in-from-right-4 duration-500">
                <header className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">AI Strategic Analysis</h1>
                  <p className="text-slate-500 mt-2">
                    Generate comprehensive reports on Kuaishou's strategy using Gemini 2.5.
                  </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Controls */}
                  <div className="lg:col-span-4 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Select Topic</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-2">
                        {Object.values(AnalysisTopic).map((topic) => (
                          <Button
                            key={topic}
                            variant={aiTopic === topic ? 'default' : 'outline'}
                            className="justify-start text-left h-auto py-3"
                            onClick={() => handleGenerateAnalysis(topic)}
                            disabled={loading}
                          >
                            {topic === AnalysisTopic.HISTORY && <History size={16} className="mr-2" />}
                            {topic === AnalysisTopic.BUSINESS_MODEL && <DollarSign size={16} className="mr-2" />}
                            {topic === AnalysisTopic.COMPETITION && <TrendingUp size={16} className="mr-2" />}
                            {topic === AnalysisTopic.FUTURE && <Search size={16} className="mr-2" />}
                            {topic}
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-orange-50 border-orange-100">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Bot className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                          <div>
                            <h4 className="font-semibold text-orange-900 text-sm">Analyst Insight</h4>
                            <p className="text-xs text-orange-700 mt-1">
                              Gemini analyzes current market trends, public financial reports, and competitive landscape data to generate these insights.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Content Area */}
                  <div className="lg:col-span-8">
                    <Card className="min-h-[500px]">
                      <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle>{aiTopic}</CardTitle>
                            {loading && <span className="text-xs text-slate-400 animate-pulse">Generating...</span>}
                          </div>
                          <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 lg:p-8">
                        {loading ? (
                          <div className="space-y-4 animate-pulse">
                             <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                             <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                             <div className="h-4 bg-slate-200 rounded w-full"></div>
                             <div className="space-y-2 mt-8">
                               <div className="h-4 bg-slate-200 rounded w-full"></div>
                               <div className="h-4 bg-slate-200 rounded w-full"></div>
                               <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                             </div>
                          </div>
                        ) : (
                          <div className="max-w-none">
                            <MarkdownRenderer content={aiContent} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
