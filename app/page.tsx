"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Rocket,
  Menu,
  X,
  Users,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { submitWaitlist, type WaitlistState } from "./actions/waitlist"
import { useActionState } from "react"

// Animation variants
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
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

export default function LyvoraLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [waitlistState, waitlistAction, isPending] = useActionState<WaitlistState, FormData>(submitWaitlist, null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const scaleSpring = useSpring(scale, springConfig)

  // Header opacity based on scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.95, 0.98])
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [30, 50])

  // Mouse tracking for hero gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
          }}
        />
      </div>

      {/* Enhanced Header with Shadow Gradient and Opacity */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 right-4 z-50"
        style={{ opacity: headerOpacity }}
      >
        <motion.div
          className="rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/20 header-shadow relative overflow-hidden"
          style={{ backdropFilter: `blur(${headerBlur}px)` }}
        >
          {/* Add an additional blur layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 backdrop-blur-sm" />
          <div className="relative z-10">
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
                    { name: "Features", href: "#features" },
                    { name: "Roadmap", href: "#roadmap" },
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

                  <motion.div
                    className="ml-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  ></motion.div>
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
                  className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-2xl rounded-b-2xl"
                >
                  <div className="px-6 py-6 space-y-4">
                    {[
                      { name: "Vision", href: "/vision" },
                      { name: "Pitch", href: "/pitch" },
                      { name: "Features", href: "#features" },
                      { name: "Roadmap", href: "#roadmap" },
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
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section with Enhanced Animations */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "-100px -100px"],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Enhanced Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-purple-600/30 to-transparent"
          style={{ y, opacity, scale: scaleSpring }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              A New Era
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              A New Marketplace
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-3 sm:mb-4 font-medium px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Only 2.5% fee. No borders. No middlemen.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Take control of your commerce stack — easily tokenize assets, optimize margins, comply with PCI, avoid
            gateway lock-in, or spin-up card issuing programs.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-900 to-black text-gray-300 px-6 sm:px-8 py-3 text-sm sm:text-base font-medium transition-all duration-300 shadow-xl hover:text-gray-200 w-full sm:w-auto"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Launch App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(147, 51, 234, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-purple-900 to-black text-gray-300 border-purple-500/30 px-6 sm:px-8 py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:text-gray-200 w-full sm:w-auto"
                asChild
              >
                <Link href="/vision">
                  <Users className="mr-2 h-4 w-4" />
                  Our Vision
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Trust Indicators with Sliding Images */}
      <motion.section
        className="py-12 sm:py-16 border-b border-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.p
            className="text-center text-white/60 mb-12 sm:mb-12 text-3xl sm:text-2xl text-bold"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <span className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Global leaders trust Lyvora to secure their commerce
            </span>
          </motion.p>

          {/* Sliding Images Container */}
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex items-center gap-8 sm:gap-12 lg:gap-16"
              animate={{
                x: [0, -1500],
              }}
              transition={{
                duration: 50,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ width: "200%" }}
            >
              {/* First set of logos */}
              {[
                { name: "MERCADO LIBRE", logo: "/slides/MELI.png" },
                { name: "AMAZON", logo: "/slides/amazon.jpg" },
                { name: "ALIBABA", logo: "/slides/alibaba.png" },
                { name: "SHOPEE", logo: "/slides/shopify.png" },
                { name: "EBAY", logo: "/slides/ebay.png" },
              ].map((company, index) => (
                <motion.div
                  key={`first-${company.name}`}
                  className=""
                  whileHover={{
                    scale: 1.1,
                    filter: "brightness(1.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={200}
                    height={60}
                    className=""
                  />
                </motion.div>
              ))}

              {/* Duplicate set for seamless loop */}
              {[
                { name: "MERCADO LIBRE", logo: "/slides/MELI.png" },
                { name: "AMAZON", logo: "/slides/amazon.jpg" },
                { name: "ALIBABA", logo: "/slides/alibaba.png" },
                { name: "SHOPEE", logo: "/slides/shopify.png" },
                { name: "EBAY", logo: "/slides/ebay.png" },
              ].map((company, index) => (
                <motion.div
                  key={`second-${company.name}`}
                  className=""
                  whileHover={{
                    scale: 1.1,
                    filter: "brightness(1.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image src={company.logo || ""} alt={company.name} width={200} height={60} className="" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Features Section with Enhanced Cards */}
      <motion.section
        id="features"
        className="py-16 sm:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Why Choose Lyvora?</h2>
            <p className="text-lg sm:text-xl text-white/60">Revolutionizing commerce with blockchain technology</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: TrendingUp,
                title: "How Lyvora Makes Money",
                color: "green",
                variant: "glow" as const,
                items: [
                  "Only 2.5% transaction fee",
                  "No listing or monthly fees",
                  "Transparent conversion fees",
                  "Premium features via staking",
                ],
              },
              {
                icon: Star,
                title: "Why Lyvora?",
                color: "purple",
                variant: "gradient" as const,
                items: [
                  "True decentralization",
                  "Global reach, no borders",
                  "Smart contract escrow",
                  "NFT reputation rewards",
                ],
              },
              {
                icon: Shield,
                title: "Security & Trust",
                color: "blue",
                variant: "glass" as const,
                items: ["Smart contract escrow", "On-chain reputation", "No KYC required", "Transparent disputes"],
              },
            ].map((feature, index) => (
              <motion.div key={feature.title} variants={index % 2 === 0 ? slideInLeft : slideInRight}>
                <EnhancedCard variant={feature.variant} className="h-full">
                  <EnhancedCardHeader className="pb-4">
                    <EnhancedCardTitle className="text-xl">{feature.title}</EnhancedCardTitle>
                  </EnhancedCardHeader>
                  <EnhancedCardContent className="text-white/70">
                    <ul className="space-y-3">
                      {feature.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className={`h-4 w-4 text-${feature.color}-400 mt-1 flex-shrink-0`} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </EnhancedCardContent>
                </EnhancedCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Roadmap Section */}
      <section id="roadmap" className="py-16 sm:py-20 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Roadmap</h2>
            <p className="text-lg sm:text-xl text-white/60">Our journey to revolutionize decentralized commerce</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  phase: "Phase 1 — Near Completion",
                  title: "Laying the Foundation",
                  status: "completed",
                  icon: CheckCircle,
                  color: "purple",
                  items: [
                    "✅ Project ideation and validation",
                    "✅ Core vision finalization",
                    "✅ Professional landing page",
                    "✅ Community channels setup",
                    "✅ Core team assembly",
                    "✅ Strategic planning",
                  ],
                },
                {
                  phase: "Phase 2 — In Progress",
                  title: "Interface Design and Technical Setup",
                  status: "progress",
                  icon: Zap,
                  color: "purple",
                  items: [
                    "✅ Official landing page completion",
                    "✅ MVP interface development",
                    "🔄 Smart contract development",
                    "🔄 Grant applications",
                    "🔄 Community growth",
                    "🔄 On-chain reputation building",
                  ],
                },
                {
                  phase: "Phase 3 — Next Steps",
                  title: "MVP Integration and Testnet Launch",
                  status: "upcoming",
                  icon: Target,
                  color: "purple",
                  items: [
                    "🎯 Full MVP integration",
                    "🎯 Testnet deployment",
                    "🎯 On-chain escrow simulation",
                    "🎯 Reputation system launch",
                    "🎯 Security audit",
                    "🎯 Real user airdrop campaign",
                  ],
                },
                {
                  phase: "Phase 4 — Expansion & Governance",
                  title: "Mainnet Launch and Global Scale",
                  status: "future",
                  icon: Rocket,
                  color: "purple",
                  items: [
                    "🚀 Mainnet launch",
                    "🚀 Lyvora Token introduction",
                    "🚀 DAO formation",
                    "🚀 Global expansion",
                    "🚀 Advanced features rollout",
                    "🚀 Mobile version launch",
                  ],
                },
              ].map((phase, index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-12 w-12 bg-${phase.color}-500 rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <phase.icon className="h-6 w-6 text-white" />
                    </div>
                    {index < 3 && <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent mt-4" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div>
                      <Badge
                        className={`bg-${phase.color}-500/20 text-${phase.color}-300 border-${phase.color}-500/30 mb-3`}
                      >
                        {phase.phase}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">{phase.title}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-white/70">
                      {phase.items.map((item, itemIndex) => (
                        <p key={itemIndex} className="mb-2">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sleek Join Waitlist Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6">
                <Image src="/logo-new.png" alt="Lyvora" width={50} height={16} className="brightness-0 invert" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Join the Lyvora</h2>
            </div>

            {/* Form Container */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
              <form action={waitlistAction} className="space-y-6">
                {/* Success/Error Messages */}
                {waitlistState && (
                  <div
                    className={`p-4 rounded-xl border ${
                      waitlistState.success
                        ? "bg-green-500/10 border-green-500/30 text-green-300"
                        : "bg-red-500/10 border-red-500/30 text-red-300"
                    }`}
                  >
                    {waitlistState.message}
                  </div>
                )}

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Field */}
                  <div className="md:col-span-1">
                    <label className="block text-white font-medium mb-3 text-sm">Your Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Your full name here"
                        className="w-full h-14 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="md:col-span-1">
                    <label className="block text-white font-medium mb-3 text-sm">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="w-full h-14 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* New Required Question */}
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-3 text-sm">
                      Which of these best describes you? <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="description"
                      className="w-full h-14 bg-white/10 border border-white/20 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-gray-900 text-white">
                        Select the option that best describes you
                      </option>
                      <option value="traditional-seller" className="bg-gray-900 text-white">
                        I sell on traditional marketplaces (e.g., Amazon, AliExpress, Shopee, Mercado Libre)
                      </option>
                      <option value="web3-user" className="bg-gray-900 text-white">
                        I already use Web3 platforms and know about crypto/blockchain
                      </option>
                      <option value="want-to-start" className="bg-gray-900 text-white">
                        I don't sell online yet, but I want to start
                      </option>
                      <option value="other" className="bg-gray-900 text-white">
                        Other (please specify)
                      </option>
                    </select>
                  </div>

                  {/* Country Field */}
                  <div className="md:col-span-1">
                    <label className="block text-white font-medium mb-3 text-sm">Where are you from?</label>
                    <select
                      name="country"
                      className="w-full h-14 bg-white/10 border border-white/20 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-gray-900 text-white">
                        Select your country
                      </option>
                      <option value="us" className="bg-gray-900 text-white">
                        United States
                      </option>
                      <option value="ca" className="bg-gray-900 text-white">
                        Canada
                      </option>
                      <option value="mx" className="bg-gray-900 text-white">
                        Mexico
                      </option>
                      <option value="br" className="bg-gray-900 text-white">
                        Brazil
                      </option>
                      <option value="ar" className="bg-gray-900 text-white">
                        Argentina
                      </option>
                      <option value="uk" className="bg-gray-900 text-white">
                        United Kingdom
                      </option>
                      <option value="de" className="bg-gray-900 text-white">
                        Germany
                      </option>
                      <option value="fr" className="bg-gray-900 text-white">
                        France
                      </option>
                      <option value="es" className="bg-gray-900 text-white">
                        Spain
                      </option>
                      <option value="it" className="bg-gray-900 text-white">
                        Italy
                      </option>
                      <option value="jp" className="bg-gray-900 text-white">
                        Japan
                      </option>
                      <option value="kr" className="bg-gray-900 text-white">
                        South Korea
                      </option>
                      <option value="au" className="bg-gray-900 text-white">
                        Australia
                      </option>
                      <option value="in" className="bg-gray-900 text-white">
                        India
                      </option>
                      <option value="sg" className="bg-gray-900 text-white">
                        Singapore
                      </option>
                      <option value="other" className="bg-gray-900 text-white">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Role Field */}
                  <div className="md:col-span-1">
                    <label className="block text-white font-medium mb-3 text-sm">I'm interested as a</label>
                    <select
                      name="role"
                      className="w-full h-14 bg-white/10 border border-white/20 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-gray-900 text-white">
                        Select your role
                      </option>
                      <option value="buyer" className="bg-gray-900 text-white">
                        Buyer
                      </option>
                      <option value="seller" className="bg-gray-900 text-white">
                        Seller
                      </option>
                      <option value="both" className="bg-gray-900 text-white">
                        Both
                      </option>
                      <option value="investor" className="bg-gray-900 text-white">
                        Investor
                      </option>
                      <option value="developer" className="bg-gray-900 text-white">
                        Developer
                      </option>
                    </select>
                  </div>
                </div>

                {/* Expectations Field */}
                <div>
                  <label className="block text-white font-medium mb-3 text-sm">
                    What excites you most about Lyvora? (Optional)
                  </label>
                  <textarea
                    name="expectations"
                    placeholder="Share your thoughts..."
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                  <div className="flex w-full mt-6">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <Users className="w-5 h-5" />
                      {isPending ? "Submitting..." : "Join Waitlist"}
                      {!isPending && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">2.5%</div>
                <div className="text-white/60 text-sm">Transaction Fee</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">0</div>
                <div className="text-white/60 text-sm">Hidden Fees</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-white/60 text-sm">Global Reach</div>
              </div>
            </div>
          </div>
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
                  Live on Testnet
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
                    href: "https://getlyvora.com",
                    icon: "/icons/website.png",
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
