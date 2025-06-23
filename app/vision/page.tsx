"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Globe,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Rocket,
  Star,
  Shield,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Add this state variable in the component
const VisionPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const slideInLeft = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  }

  const slideInRight = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  }

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.95, 0.98])
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [20, 30])

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Enhanced Header with Shadow Gradient and Opacity - Same as Main Page */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-50"
        style={{ opacity: headerOpacity }}
      >
        <motion.div
          className="rounded-2xl bg-black/95 backdrop-blur-xl border border-white/20 header-shadow"
          style={{ backdropFilter: `blur(${headerBlur}px)` }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="flex items-center space-x-3">
                  <Image src="/logo-new.png" alt="Lyvora" width={50} height={16} className="brightness-0 invert" />
                  <span className="text-white font-bold tracking-tight text-3xl">Lyvora</span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {[
                  { name: "Vision", href: "/vision" },
                  { name: "Pitch", href: "/pitch" },
                  { name: "Features", href: "/#features" },
                  { name: "Roadmap", href: "/#roadmap" },
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-all duration-300 group"
                    >
                      <span className="relative z-10 text-2xl">{item.name}</span>
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.05 }}
                      />
                      <motion.div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden relative p-2 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-lg rounded-b-2xl"
              >
                <div className="px-6 py-6 space-y-4">
                  {[
                    { name: "Vision", href: "/vision" },
                    { name: "Pitch", href: "/pitch" },
                    { name: "Features", href: "/#features" },
                    { name: "Roadmap", href: "/#roadmap" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-white/70 hover:text-white transition-colors text-sm py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-900 to-black text-gray-300 w-full hover:text-gray-200"
                    >
                      <Sparkles className="mr-2 h-3 w-3" />
                      Launch App
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 pt-28 sm:pt-32 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20">
        <div className="container mx-auto px-4 sm:px-6 mt-12 sm:mt-8">
          <motion.div className="text-center mb-8 sm:mb-4" variants={fadeInUp} initial="initial" animate="animate">
            <Badge className="mb-4 sm:mb-6 bg-purple-500/20 text-purple-200 border-purple-500/30 text-xs sm:text-sm">
              <Rocket className="mr-2 h-3 w-3" />
              Our Vision
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
              Why We Exist
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
              Where We're Going
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto px-4 mt-8 sm:mt-12">
              Lyvora is not just another crypto marketplace. It's a true gateway from Web2 into Web3.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm mb-8 sm:mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p
                className="text-white/90 text-lg leading-relaxed mb-8"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
              >
                Lyvora is not just another crypto marketplace. It's a true gateway from Web2 into Web3 — a new standard
                for physical product commerce. Our value proposition is simple yet transformative: combine the global
                reach and efficiency of traditional marketplaces with the power of decentralization, freedom, and
                transparency.
              </motion.p>

              <motion.div
                className="grid md:grid-cols-2 gap-8 mb-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                <motion.div variants={fadeInUp}>
                  <h3 className="text-purple-300 font-semibold mb-4 text-lg flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Building 100% on-chain on SUI blockchain:
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Eliminating middlemen and extremely high fees",
                      "Enabling direct crypto payments between buyers and sellers",
                      "Creating a fraud-proof on-chain reputation system",
                      "Making the experience accessible even to users unfamiliar with Web3",
                      "Providing video tutorials and educational support for real onboarding",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <h3 className="text-purple-300 font-semibold mb-4 text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Why this matters
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Most Web3 projects are still stuck in niches like collectibles or gaming. Lyvora is betting on something bigger: real commerce, with real products and global users who seek freedom, efficiency, and savings.",
                      "On SUI, every interaction will be an on-chain transaction: listing, buying, reviewing, reputation building. This generates real volume from real users — not just airdrop farmers.",
                      "If Lyvora works (and it will), SUI will have the biggest real-world adoption case in Web3.",
                      "This market already exists. It just needs to be set free.",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/80">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <p className="text-xl font-bold text-white">Let's make it happen.</p>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-purple-500/10 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-purple-300 font-semibold mb-3 text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5" />Lyvora's Mission
                </h3>
                <div className="space-y-4 text-white/90">
                  <p>
                    To build a truly global and decentralized marketplace where anyone can buy and sell with full
                    freedom, security, and control over their assets.
                  </p>
                  <p>
                    Our mission is to eliminate borders, middlemen, and restrictions — connecting people around the
                    world through a platform based on on-chain trust, direct crypto payments, and true inclusion.
                  </p>
                  <p className="font-semibold">
                    We aim to revolutionize digital commerce by setting a new standard where the power belongs to users
                    - not the platforms.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Global Market Overview Section */}
            <motion.div
              className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Globe className="mr-3 h-8 w-8" />Global Market Overview - Lyvora in Context
              </h2>
              <p className="text-white/80 mb-8">
                Before we present Lyvora, it's essential to understand the real scalability of traditional marketplaces
                across each continent - in terms of sellers, buyers, revenue, and potential. This demonstrates the Web3
                opportunity we are aiming for.
              </p>

              {/* Strategic Impact */}
              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20 backdrop-blur-sm mb-8">
                <h3 className="text-blue-300 font-semibold mb-4 text-lg flex items-center">
                  <Target className="mr-2 h-5 w-5" />Strategic Impact for Lyvora
                </h3>
                <ul className="space-y-3 text-white/80">
                  {[
                    "The scale of the players shown - ranging from tens to hundreds of millions of users and billions in revenue - sets the benchmark for Lyvora's ambition.",
                    "Their global reach confirms: even capturing 1% of this base already represents a massive Web3 use case and a relevant adoption driver for SUI.",
                    "The roadmap is clear: we start in Latin America, expand globally, and prove that something decentralized can compete at this level.",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <p className="text-white font-semibold mb-2">
                    Lyvora has the opportunity to become the next big global marketplace, built on the success of Web2 players, but with:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {[
                      { icon: Zap, text: "Lower flat fees (2.5%)" },
                      { icon: Users, text: "Direct crypto payments" },
                      { icon: Shield, text: "On-chain reputation" },
                      { icon: Globe, text: "Borderless, no KYC" },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <feature.icon className="h-4 w-4 text-purple-400" />
                        <span className="text-white/80 text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Regional Examples */}
              <h3 className="text-2xl font-bold text-white mb-6">Strategic Regional Examples</h3>

              <div className="space-y-6">
                {/* Mercado Libre */}
                <motion.div
                  className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-yellow-300 mb-4">🔹 Mercado Libre (Latin America)</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-2 text-white/80">
                        <li>• Present in 18 Latin American countries</li>
                        <li>• Over 8 million sellers across the region</li>
                        <li>• More than 200 million active users</li>
                        <li>• Processes over 1 billion listings per year</li>
                      </ul>
                    </div>
                    <div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-yellow-300 font-semibold mb-2">Why does this matter for Lyvora?</p>
                        <p className="text-white/80 text-sm mb-3">
                          Latin America's strength as a logical starting point for Lyvora
                        </p>
                        <p className="text-yellow-300 font-semibold mb-2">Strategic Vision</p>
                        <p className="text-white/80 text-sm">
                          Even capturing just 1% of this ecosystem validates Lyvora as a massive Web3 case.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Amazon */}
                <motion.div
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-orange-300 mb-4">🔹 Amazon (North America & Global)</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-2 text-white/80">
                        <li>• Over 9.7 million active sellers worldwide</li>
                        <li>• 310+ million customer accounts</li>
                        <li>• Over $574 billion net revenue in 2023</li>
                      </ul>
                    </div>
                    <div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-orange-300 font-semibold mb-2">Why does this matter for Lyvora?</p>
                        <p className="text-white/80 text-sm mb-3">
                          Amazon demonstrates the power of global marketplaces at scale, powered by logistics and tech
                        </p>
                        <p className="text-orange-300 font-semibold mb-2">Strategic Vision</p>
                        <p className="text-white/80 text-sm">
                          With a decentralized approach, we can compete by offering lower costs and greater freedom
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Alibaba */}
                <motion.div
                  className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl p-6 border border-red-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-red-300 mb-4">🔹 Alibaba (China & Global)</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-2 text-white/80">
                        <li>• 1.31 billion annual active consumers in 2023</li>
                        <li>• Revenue of approximately $130–137 billion between 2023 and 2024</li>
                        <li>• Q4 2024 revenue: $38.4 billion (+8% YoY)</li>
                        <li>• International commerce revenue: $4.3 billion (+36% YoY)</li>
                      </ul>
                    </div>
                    <div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-red-300 font-semibold mb-2">Why does this matter for Lyvora?</p>
                        <p className="text-white/80 text-sm mb-3">
                          Alibaba's massive scale proves the global appetite for e-commerce platforms
                        </p>
                        <p className="text-red-300 font-semibold mb-2">Strategic Vision</p>
                        <p className="text-white/80 text-sm">
                          Lyvora can mirror this international growth by using decentralization and lower fees as its
                          competitive edge.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Shopee */}
                <motion.div
                  className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl p-6 border border-green-500/20"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-green-300 mb-4">
                    🔹 SHOPEE (Sea Group) - Southeast Asia & Latin America
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-green-300 font-semibold mb-2">2024 Full-Year Results</p>
                      <ul className="space-y-2 text-white/80 text-sm">
                        <li>• Total GAAP revenue: $16.8 billion (+28.8% YoY)</li>
                        <li>• E-commerce revenue: $12.4 billion (+37.9% YoY)</li>
                        <li>• GMV: $100.5 billion (+28.0% YoY)</li>
                        <li>• Gross orders: 10.9 billion (+33.0% YoY)</li>
                      </ul>
                      <p className="text-green-300 font-semibold mb-2 mt-4">Q4 2024 Highlights</p>
                      <ul className="space-y-2 text-white/80 text-sm">
                        <li>• E-commerce revenue (Q4): $3.7 billion (+41.3% YoY)</li>
                        <li>• GMV (Q4): $28.6 billion (+23.5% YoY)</li>
                        <li>• Gross orders (Q4): 3.0 billion (+20.1% YoY)</li>
                      </ul>
                    </div>
                    <div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-green-300 font-semibold mb-2">Why does this matter for Lyvora?</p>
                        <p className="text-white/80 text-sm mb-3">
                          Strategic validation: Shopee's scale and profitability prove aggressive growth is feasible
                          even in emerging markets.
                        </p>
                        <p className="text-green-300 font-semibold mb-2">Strategic Vision</p>
                        <p className="text-white/80 text-sm">
                          Shopee demonstrates that platforms can achieve rapid volume—Lyvora can mimic this trajectory,
                          using decentralization and lower fees as key differentiators.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Additional platforms in a more compact format */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Jumia */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl p-6 border border-purple-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-bold text-purple-300 mb-3">🔹 Jumia (Africa)</h4>
                    <ul className="space-y-1 text-white/80 text-sm mb-4">
                      <li>• Q1 2025 revenue: $36.3 million</li>
                      <li>• GMV: $161.7 million in Q1 2025</li>
                      <li>• 2.1 million quarterly active customers (+15%)</li>
                    </ul>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-purple-300 font-semibold text-sm mb-1">Strategic Vision</p>
                      <p className="text-white/80 text-xs">
                        Jumia's momentum validates Africa as a strategic continent for Lyvora's decentralized
                        marketplace.
                      </p>
                    </div>
                  </motion.div>

                  {/* eBay */}
                  <motion.div
                    className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-bold text-blue-300 mb-3">🔹 eBay (Global & Oceania)</h4>
                    <ul className="space-y-1 text-white/80 text-sm mb-4">
                      <li>• Revenue: $2.6 billion in Q1 2025 (+2% YoY)</li>
                      <li>• GMV: $18.8 billion in Q1 2025 (+2% YoY)</li>
                      <li>• 134 million active buyers globally</li>
                    </ul>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-blue-300 font-semibold text-sm mb-1">Strategic Vision</p>
                      <p className="text-white/80 text-xs">
                        Even a slice of eBay's global volume would make Lyvora a significant use case on SUI.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Summary */}
              <motion.div
                className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <CheckCircle className="mr-2 h-6 w-6 text-green-400" />Summary
                </h3>
                <p className="text-white/80 mb-4 text-sm">
                  All numbers above are sourced from official investor reports and reputable financial news.
                </p>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-purple-300 font-semibold mb-3">Consolidated Strategy</h4>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li>
                      <strong>Strong regional scale:</strong> Even without Amazon-level reach, these platforms show real
                      traction in mature markets.
                    </li>
                    <li>
                      <strong>Diverse models:</strong> Each delivers unique value — local citizen focus, niche
                      specialization, hybrid marketplaces — opening unique opportunities.
                    </li>
                    <li>
                      <strong>Validation for Lyvora:</strong> Even 1% of this scale makes Lyvora a major SUI/Web3 case.
                      Ambition backed by facts, not fantasy.
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Ready to Join the Lyvora?</h2>
            <p className="text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Be part of the future of decentralized commerce. Join our waitlist and get early access to Lyvora.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-900 to-black text-gray-300 hover:text-gray-200 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/#waitlist">Join Waitlist</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-gradient-to-r from-purple-900 to-black text-gray-300 border-purple-500/30 hover:text-gray-200 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/pitch">Read Our Pitch</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer with New Layout */}
      <motion.footer
        className="relative border-t border-white/10 bg-gradient-to-b from-black to-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

        <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Logo and Description */}
            <motion.div
              className="lg:col-span-1"
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Image src="/logo-new.png" alt="Lyvora" width={50} height={16} className="brightness-0 invert" />
                  <span className="text-white font-bold text-2xl tracking-tight">Lyvora</span>
                </div>
              </motion.div>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
                The future of decentralized commerce. Built on SUI blockchain for maximum security, transparency, and
                global accessibility.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Live on Testnet (comming soon)
                </Badge>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="lg:col-span-1"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4 text-lg">Platform</h3>
              <ul className="space-y-3">
                {[
                  { name: "Vision", href: "/vision" },
                  { name: "Pitch", href: "/pitch" },
                  { name: "Features", href: "#features" },
                  { name: "Roadmap", href: "#roadmap" },
                ].map((link, index) => (
                  <motion.li key={link.name} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Community Section - New Horizontal Layout */}
            <motion.div
              className="lg:col-span-1"
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4 text-lg">Join Our Community</h3>
              <p className="text-white/60 text-sm mb-6">Connect with us and stay updated on the latest developments</p>

              {/* Horizontal Social Links */}
              <div className="flex space-x-2">
                {[
                  {
                    href: "https://github.com/Lyvora",
                    icon: "/icons/github.png",
                    color: "pink",
                  },
                  {
                    href: "https://x.com/lyvoraofficial",
                    icon: "/icons/twitter.png",
                    color: "blue",
                  },
                  {
                    href: "https://discord.gg/wa3aMU5pmH",
                    icon: "/icons/discord.png",
                    color: "pink",
                  },
                  {
                    href: "https://www.instagram.com/lyvora.official",
                    icon: "/icons/instagram.png",
                    color: "pink",
                  },
                  {
                    href: "https://medium.com/@Lyvora",
                    icon: "/icons/medium.png",
                    color: "pink",
                  },
                  {
                    href: "mailto:contact@getlyvora.com",
                    icon: "/icons/email.png",
                    color: "pink",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={social.icon}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Link href={social.href}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-${social.color}-500/20`}>
                          <Image
                            src={social.icon || "/placeholder.svg"}
                            alt=""
                            width={32}
                            height={32}
                            className="brightness-0 invert"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center sm:text-left">
              <p className="text-white/50 text-xs sm:text-sm mb-1">© 2025 Lyvora. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <p className="text-white/30 text-xs">Decentralized marketplace powered by SUI blockchain</p>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

export default VisionPage
