"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Target,
  Zap,
  Shield,
  Users,
  Globe,
  CheckCircle,
  Rocket,
  Star,
  ArrowRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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

export default function PitchPage() {
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.95, 0.98])
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [30, 50])

  // Add this state variable in the component
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          className="rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/20 header-shadow relative overflow-hidden"
          style={{ backdropFilter: `blur(${headerBlur}px)` }}
        >
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
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12 sm:mb-16" variants={fadeInUp} initial="initial" animate="animate">
            {/* <Badge className="mb-4 sm:mb-6 bg-purple-500/20 text-purple-200 border-purple-500/30 text-xs sm:text-sm">
              <Rocket className="mr-2 h-3 w-3" />
              Our Pitch
            </Badge> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-12 sm:mt-16 md:mt-14 mb-4 sm:mb-6 px-2">What is Lyvora?</h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto px-4">
              A decentralized marketplace for real-world products — powered by crypto payments, smart contracts, and
              transparent on-chain reputation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Core Principles</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Built on the foundation of true decentralization</p>
          </motion.div>

          {/* Simple Feature Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                icon: Zap,
                text: "No fixed fees",
                iconColor: "text-yellow-400",
              },
              {
                icon: Globe,
                text: "No borders",
                iconColor: "text-blue-400",
              },
              {
                icon: Users,
                text: "No middlemen",
                iconColor: "text-green-400",
              },
              {
                icon: Shield,
                text: "No account freezing",
                iconColor: "text-purple-400",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center group">
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                </motion.div>
                <p className="text-white/80 font-medium text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Simple Call-to-Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-xl sm:text-2xl text-white/90 font-medium px-4">
              Lyvora gives economic power back to those who actually sell — not to the platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 sm:py-20 bg-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Problem */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-red-500/10 border-red-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-red-300 flex items-center">
                      <Target className="mr-2 h-5 w-5" />
                      The Problem
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/80">
                    <p className="mb-4">
                      Traditional marketplaces charge extremely high commissions, impose rigid rules, and centralize all
                      control.
                    </p>
                    <ul className="space-y-2">
                      <li>• Sellers pay up to 20% in fees</li>
                      <li>• Accounts can be frozen at any time</li>
                      <li>• Significant income lost to middlemen</li>
                      <li>• No freedom, transparency, or protection</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-green-500/10 border-green-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="text-green-300 flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      The Solution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/80">
                    <p className="mb-4">
                      Lyvora uses smart contracts to hold payments in escrow — funds are only released once delivery is
                      confirmed.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        No need to trust the seller
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        No reliance on platform admins
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Just trust the code
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12 sm:mb-16" variants={fadeInUp} initial="initial" animate="animate">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-white/60">Simple, secure, and transparent</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="space-y-6 sm:space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  step: "1",
                  title: "Products Listed",
                  description: "Products are displayed with prices in USDT (or USD) for global clarity",
                },
                {
                  step: "2",
                  title: "Payment in SUI",
                  description:
                    "Buyers pay using SUI, the native token of the Sui blockchain. Amount is converted automatically at current rate",
                },
                {
                  step: "3",
                  title: "Smart Contract Escrow",
                  description: "Funds are locked in a smart contract (escrow) until delivery is confirmed",
                },
                {
                  step: "4",
                  title: "Product Shipped",
                  description: "Seller ships the product to the buyer's address",
                },
                {
                  step: "5",
                  title: "Delivery Confirmed",
                  description:
                    "Buyer confirms delivery and funds are released. If not confirmed, dispute process is triggered",
                },
              ].map((step, index) => (
                <motion.div key={step.step} variants={fadeInUp} className="flex gap-4 sm:gap-6 items-start">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-16 sm:py-20 bg-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12 sm:mb-16" variants={fadeInUp} initial="initial" animate="animate">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Lyvora Is Different</h2>
            <p className="text-lg sm:text-xl text-white/60">We're not trying to be the "Amazon of Web3"</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-sm mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-purple-300 font-semibold mb-3 sm:mb-4 text-lg">Core Features</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white/80">
                    {[
                      "No fixed or hidden fees",
                      "No subscriptions",
                      "No withdrawal fees",
                      "No complex KYC",
                      "Public, on-chain reputation",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-purple-300 font-semibold mb-3 sm:mb-4 text-lg">Future Features</h3>
                  <ul className="space-y-2 sm:space-y-3 text-white/80">
                    {[
                      "NFTs and governance",
                      "Built-in DEX",
                      "Local or global sellers",
                      "Escrow handled by code",
                      "Reputation-based rewards",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 sm:gap-3">
                        <Star className="h-4 w-4 text-purple-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xl sm:text-2xl text-white/90 font-medium px-4">
                Lyvora is a reset button — for real-world commerce, rebuilt by and for real people.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team & Progress */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 gap-8 sm:gap-12"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Who's Building Lyvora</h2>
                <p className="text-white/80 mb-4 sm:mb-6">
                  Lyvora is being built by a global, crypto-native team with real experience in blockchain, design, and
                  e-commerce.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-white/70">
                  <li>• Marco (Founder) — e-commerce entrepreneur with vision for decentralized platforms</li>
                  <li>• Senior designer — high-impact branding and UI</li>
                  <li>• Full stack + blockchain engineer — specialized in Sui ecosystem</li>
                  <li>• Senior frontend developer — performance and scalability expert</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Progress So Far</h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Initial landing page launched — getlyvora.com",
                    "Core team in place (frontend, backend, design, founder)",
                    "MVP interface under development",
                    "Twitter and Discord setup in progress",
                    "Visual identity in progress with professional touch",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Join the Lyvora</h2>
            <p className="text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              We're just getting started. If you believe in a fairer, more transparent, decentralized future for
              commerce - join us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-900 to-black text-gray-300 hover:text-gray-200"
                  asChild
                >
                  <Link href="/#waitlist">Join Waitlist</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-gradient-to-r from-purple-900 to-black text-gray-300 border-purple-500/30 hover:text-gray-200"
                  asChild
                >
                  <Link href="/vision">Read Our Vision</Link>
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
