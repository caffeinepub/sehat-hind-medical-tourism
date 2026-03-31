import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  ArrowRight,
  Award,
  Baby,
  Bone,
  Brain,
  Car,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Cross,
  Globe,
  Heart,
  Hotel,
  Languages,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Pill,
  Plane,
  Star,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

// ─── Data ─────────────────────────────────────────────────────────────────────

const destinations = [
  {
    flag: "🇮🇳",
    name: "India",
    desc: "World-class hospitals, affordable care",
    patients: "60,000+",
  },
  {
    flag: "🇹🇷",
    name: "Turkey",
    desc: "Advanced oncology & cosmetic surgery",
    patients: "15,000+",
  },
  {
    flag: "🇹🇭",
    name: "Thailand",
    desc: "JCI-accredited centers of excellence",
    patients: "8,000+",
  },
  {
    flag: "🇦🇪",
    name: "UAE",
    desc: "Premium luxury healthcare facilities",
    patients: "5,000+",
  },
  {
    flag: "🇩🇪",
    name: "Germany",
    desc: "Precision medicine & cutting-edge tech",
    patients: "4,000+",
  },
  {
    flag: "🇪🇬",
    name: "Egypt",
    desc: "Affordable quality care in North Africa",
    patients: "2,500+",
  },
];

const specialties = [
  {
    icon: <Activity size={28} />,
    name: "Oncology",
    desc: "Cancer care & chemotherapy",
  },
  {
    icon: <Brain size={28} />,
    name: "Neurosurgery",
    desc: "Brain & nervous system procedures",
  },
  {
    icon: <Bone size={28} />,
    name: "Spine Surgery",
    desc: "Minimally invasive spine care",
  },
  {
    icon: <Heart size={28} />,
    name: "Cardiology",
    desc: "Heart surgeries & interventions",
  },
  {
    icon: <Bone size={28} />,
    name: "Orthopedics",
    desc: "Joints, bones & sports injuries",
  },
  { icon: <Baby size={28} />, name: "IVF", desc: "Fertility treatments & IVF" },
  {
    icon: <Heart size={28} />,
    name: "Gynecology",
    desc: "Women's health & surgery",
  },
  {
    icon: <Star size={28} />,
    name: "Cosmetic",
    desc: "Aesthetic & reconstructive surgery",
  },
  {
    icon: <Activity size={28} />,
    name: "Weight Loss",
    desc: "Bariatric & metabolic surgery",
  },
  {
    icon: <Activity size={28} />,
    name: "Liver Transplant",
    desc: "Living & deceased donor",
  },
  {
    icon: <Activity size={28} />,
    name: "Kidney Transplant",
    desc: "Renal transplantation",
  },
  {
    icon: <Activity size={28} />,
    name: "Bone Marrow",
    desc: "BMT for cancer & disorders",
  },
];

const hospitals: Record<
  string,
  Array<{ name: string; city: string; beds: string; specialty: string }>
> = {
  India: [
    {
      name: "Medanta – The Medicity",
      city: "Gurgaon",
      beds: "1,500+",
      specialty: "Multi-Specialty",
    },
    {
      name: "Apollo Hospitals",
      city: "New Delhi",
      beds: "700+",
      specialty: "Cardiology, Oncology",
    },
    {
      name: "Kokilaben Hospital",
      city: "Mumbai",
      beds: "750+",
      specialty: "Neurosurgery, Transplant",
    },
    {
      name: "Fortis Memorial",
      city: "Delhi",
      beds: "310+",
      specialty: "Orthopedics, Spine",
    },
  ],
  Turkey: [
    {
      name: "Medical Park",
      city: "Istanbul",
      beds: "800+",
      specialty: "Oncology, Cardiology",
    },
    {
      name: "Memorial Hospitals",
      city: "Istanbul",
      beds: "650+",
      specialty: "Neurology, Transplant",
    },
  ],
  Thailand: [
    {
      name: "Bumrungrad International",
      city: "Bangkok",
      beds: "580+",
      specialty: "Multi-Specialty",
    },
    {
      name: "Bangkok Hospital",
      city: "Bangkok",
      beds: "670+",
      specialty: "Cardiology, Orthopedics",
    },
  ],
  UAE: [
    {
      name: "Burjeel Hospital",
      city: "Abu Dhabi",
      beds: "220+",
      specialty: "Oncology, Orthopedics",
    },
    {
      name: "Saudi German Hospital",
      city: "Dubai",
      beds: "300+",
      specialty: "Multi-Specialty",
    },
  ],
  Germany: [
    {
      name: "Charité – Universitätsmedizin",
      city: "Berlin",
      beds: "3,000+",
      specialty: "Research & Cancer",
    },
    {
      name: "Heidelberg University Hospital",
      city: "Heidelberg",
      beds: "1,800+",
      specialty: "Neuroscience, Oncology",
    },
  ],
};

const treatments = [
  { name: "Knee Replacement", price: "$4,000", icon: <Bone size={24} /> },
  { name: "Hip Replacement", price: "$5,500", icon: <Bone size={24} /> },
  { name: "Brain Tumor Surgery", price: "$5,000", icon: <Brain size={24} /> },
  { name: "Heart Bypass (CABG)", price: "$4,500", icon: <Heart size={24} /> },
  { name: "Valve Replacement", price: "$9,500", icon: <Heart size={24} /> },
  {
    name: "Breast Cancer Treatment",
    price: "$5,000",
    icon: <Activity size={24} />,
  },
  {
    name: "Lung Cancer Treatment",
    price: "$5,500",
    icon: <Activity size={24} />,
  },
  { name: "Hair Transplant", price: "$1,400", icon: <Star size={24} /> },
  { name: "IVF Treatment", price: "$2,000", icon: <Baby size={24} /> },
  {
    name: "Bone Marrow Transplant",
    price: "$15,000",
    icon: <Activity size={24} />,
  },
  { name: "Rhinoplasty", price: "$1,800", icon: <Star size={24} /> },
  { name: "Liver Transplant", price: "$25,000", icon: <Activity size={24} /> },
];

const steps = [
  {
    num: "01",
    icon: <MessageCircle size={32} />,
    title: "Share Case Details",
    desc: "Contact us and share your medical reports, diagnosis, and requirements with our care team.",
  },
  {
    num: "02",
    icon: <ClipboardList size={32} />,
    title: "Get Medical Opinion",
    desc: "Receive expert medical opinion and detailed cost estimate from top hospitals within 48 hours.",
  },
  {
    num: "03",
    icon: <Plane size={32} />,
    title: "Travel & Arrival",
    desc: "We help book flights, arrange visa, and our team receives you at the airport upon arrival.",
  },
  {
    num: "04",
    icon: <CheckCircle size={32} />,
    title: "Treatment & Follow-Up",
    desc: "Get world-class treatment, then fly back home. We continue post-treatment follow-ups.",
  },
];

const services = [
  {
    icon: <ClipboardList size={28} />,
    name: "Medical Opinion & Cost Estimates",
  },
  { icon: <Phone size={28} />, name: "Pre-Travel Consultations" },
  { icon: <Globe size={28} />, name: "Visa Assistance" },
  { icon: <CreditCard size={28} />, name: "Money Exchange" },
  { icon: <Languages size={28} />, name: "Interpreters & Translators" },
  { icon: <Car size={28} />, name: "Transportation Assistance" },
  { icon: <Hotel size={28} />, name: "Accommodation Options" },
  { icon: <Pill size={28} />, name: "Admission & Pharmacy Care" },
  { icon: <UserCheck size={28} />, name: "Private Duty Nursing" },
];

const testimonials = [
  {
    name: "Emmanuel Okafor",
    country: "Nigeria",
    flag: "🇳🇬",
    rating: 5,
    text: "Sehat Hind made my cardiac surgery in India seamless. From visa to hospital, everything was handled perfectly. The team was available 24/7 and I felt truly cared for throughout my journey.",
    treatment: "Heart Bypass Surgery",
  },
  {
    name: "Grace Nakato",
    country: "Uganda",
    flag: "🇺🇬",
    rating: 5,
    text: "I traveled to India for my knee replacement. Sehat Hind arranged everything — airport pickup, hotel, hospital. The cost was a fraction of what I'd pay back home. Highly recommended!",
    treatment: "Knee Replacement",
  },
  {
    name: "Md. Raihan Islam",
    country: "Bangladesh",
    flag: "🇧🇩",
    rating: 5,
    text: "My son needed brain surgery. I was scared and lost. Sehat Hind guided us to the right neurosurgeon in Mumbai. The surgery was successful and the care was exceptional.",
    treatment: "Pediatric Neurosurgery",
  },
  {
    name: "Tigist Bekele",
    country: "Ethiopia",
    flag: "🇪🇹",
    rating: 5,
    text: "I came to India for IVF treatment after years of disappointment back home. Thanks to Sehat Hind, I found the right hospital, the treatment was affordable, and I'm now expecting!",
    treatment: "IVF Treatment",
  },
];

const faqs = [
  {
    q: "What is medical tourism and why do people travel abroad for treatment?",
    a: "Medical tourism involves traveling to another country for healthcare. People choose this for significant cost savings (60-80% cheaper), access to world-class specialists, shorter waiting times, and combining treatment with recovery in a different environment.",
  },
  {
    q: "Why choose India for medical treatment?",
    a: "India offers JCI-accredited hospitals with globally trained specialists at 20-40% of Western costs. India excels in cardiac surgery, orthopedics, oncology, and organ transplants. English is widely spoken and the country has a robust medical tourism infrastructure.",
  },
  {
    q: "How does Sehat Hind help patients?",
    a: "Sehat Hind acts as your complete medical travel partner — from identifying the right hospital and doctor, to arranging visa, flights, accommodation, airport transfer, language interpretation, and post-treatment follow-ups. We've assisted 1,00,000+ patients since 2016.",
  },
  {
    q: "Is the service free for patients?",
    a: "Yes! Our services are completely free for patients. We are compensated by our hospital network partners. You pay only for your medical treatment and travel — our facilitation, guidance, and support costs you nothing.",
  },
  {
    q: "How long does it take to get a cost estimate?",
    a: "Once you share your medical reports and details, we deliver a detailed cost estimate and medical opinion from top hospitals within 48 hours. In urgent cases, we expedite this process.",
  },
  {
    q: "What happens after treatment and I return home?",
    a: "Our care doesn't stop when you fly back. We coordinate regular follow-up consultations, help with online doctor appointments, facilitate prescription renewals, and stay in touch to monitor your recovery and address any concerns.",
  },
];

const navCountries = ["India", "Turkey", "Thailand", "UAE", "Germany"];

// ─── Components ───────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].slice(0, count).map((n) => (
        <Star key={n} size={14} className="fill-brand-star text-brand-star" />
      ))}
    </span>
  );
}

function NavDropdown({ label, items }: { label: string; items: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-1"
        >
          {label} <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {items.map((item) => (
          <DropdownMenuItem key={item} className="cursor-pointer">
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Lead Form ────────────────────────────────────────────────────────────────

function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    phone: "",
    medicalIssue: "",
    age: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.country ||
      !form.phone ||
      !form.medicalIssue ||
      !form.age
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await mutation.mutateAsync(form);
      setSubmitted(true);
      toast.success(
        "Your inquiry has been submitted! We'll contact you within 48 hours.",
      );
    } catch {
      toast.error(
        "Something went wrong. Please try again or WhatsApp us directly.",
      );
    }
  };

  if (submitted) {
    return (
      <div
        data-ocid="lead-form.success_state"
        className="bg-white rounded-2xl p-8 shadow-xl text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          Request Submitted!
        </h3>
        <p className="text-muted-foreground text-sm">
          Our medical coordinator will reach out to you within 48 hours with
          expert opinion and cost estimate.
        </p>
        <a
          href="https://wa.me/919958427958"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      data-ocid="lead.modal"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-xl space-y-4"
    >
      <h3 className="text-lg font-bold text-foreground">
        Get FREE Medical Quote
      </h3>
      <p className="text-xs text-muted-foreground">
        Response within 48 hours · 100% Free Service
      </p>

      <div className="space-y-1">
        <Label htmlFor="form-name" className="text-xs font-semibold">
          Full Name *
        </Label>
        <Input
          id="form-name"
          data-ocid="lead.input"
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="form-country" className="text-xs font-semibold">
            Country *
          </Label>
          <Select
            value={form.country}
            onValueChange={(v) => setForm((p) => ({ ...p, country: v }))}
          >
            <SelectTrigger id="form-country" data-ocid="lead.select">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Nigeria",
                "Uganda",
                "Kenya",
                "Ethiopia",
                "Tanzania",
                "Ghana",
                "Bangladesh",
                "Pakistan",
                "Sri Lanka",
                "Nepal",
                "Afghanistan",
                "Iraq",
                "Yemen",
                "Libya",
                "Sudan",
                "Somalia",
                "Zambia",
                "Zimbabwe",
                "Mozambique",
                "Malawi",
                "Rwanda",
                "South Africa",
                "UK",
                "USA",
                "Canada",
                "Australia",
                "Germany",
                "France",
                "Other",
              ].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="form-age" className="text-xs font-semibold">
            Patient Age *
          </Label>
          <Input
            id="form-age"
            data-ocid="lead.age.input"
            placeholder="e.g. 45"
            value={form.age}
            onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="form-phone" className="text-xs font-semibold">
          Phone / WhatsApp *
        </Label>
        <Input
          id="form-phone"
          data-ocid="lead.phone.input"
          placeholder="+1 234 567 8900"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="form-issue" className="text-xs font-semibold">
          Medical Issue *
        </Label>
        <Textarea
          id="form-issue"
          data-ocid="lead.textarea"
          placeholder="Describe diagnosis, reports, required treatment..."
          rows={3}
          value={form.medicalIssue}
          onChange={(e) =>
            setForm((p) => ({ ...p, medicalIssue: e.target.value }))
          }
        />
      </div>

      <Button
        type="submit"
        data-ocid="lead.submit_button"
        disabled={mutation.isPending}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full py-5 text-sm"
      >
        {mutation.isPending ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" /> Submitting...
          </>
        ) : (
          "Get FREE Quote →"
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        🔒 Your information is safe with us
      </p>
    </form>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />

      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="https://www.sehathind.com"
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Cross size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-primary">Sehat Hind</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavDropdown label="Hospitals" items={navCountries} />
            <NavDropdown label="Doctors" items={navCountries} />
            <NavDropdown
              label="Cost"
              items={[
                "Cardiology",
                "Orthopedics",
                "Oncology",
                "Neurology",
                "Transplants",
              ]}
            />
            <NavDropdown
              label="Knowledge"
              items={["Blogs", "Medical Visa", "Videos", "Patient Stories"]}
            />
            <button
              type="button"
              onClick={() => scrollTo("specialties")}
              data-ocid="nav.link"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Specialties
            </button>
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="mailto:info@sehathind.com"
              data-ocid="nav.contact.button"
              className="text-sm font-semibold text-primary border border-primary rounded-full px-4 py-1.5 hover:bg-primary/5 transition-colors"
            >
              Contact Us
            </a>
            <button
              type="button"
              onClick={() => scrollTo("quote")}
              data-ocid="nav.quote.button"
              className="text-sm font-semibold text-white bg-primary rounded-full px-5 py-1.5 hover:bg-primary/90 transition-colors"
            >
              Get A Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 py-4 space-y-3">
            {[
              "Hospitals",
              "Doctors",
              "Specialties",
              "Treatment Cost",
              "Knowledge",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className="block w-full text-left text-sm font-medium text-foreground py-2 border-b border-border/50"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.mobile.link"
              >
                {item}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <a
                href="mailto:info@sehathind.com"
                className="flex-1 text-center text-sm font-semibold text-primary border border-primary rounded-full px-4 py-2"
              >
                Contact Us
              </a>
              <button
                type="button"
                onClick={() => scrollTo("quote")}
                className="flex-1 text-sm font-semibold text-white bg-primary rounded-full px-4 py-2"
              >
                Get A Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section
        id="hero"
        className="relative min-h-[88vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-medical-tourism.dim_1920x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.22 0.05 210 / 0.95) 0%, oklch(0.26 0.06 210 / 0.85) 40%, oklch(0.26 0.06 210 / 0.30) 70%, transparent 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-6 animate-fade-in-up">
            <Badge className="bg-white/20 text-white border-white/30 text-xs font-semibold rounded-full px-3 py-1">
              🏆 World&apos;s Most Trusted Medical Travel Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Medical Treatment With{" "}
              <span style={{ color: "oklch(0.80 0.15 170)" }}>Unmatched</span>{" "}
              Personal Care
            </h1>
            <p className="text-lg text-white/80 max-w-lg">
              Connect with 500+ accredited hospitals across 6 countries. Expert
              medical opinion in 48 hours, free of charge.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Users className="text-white/70" size={20} />
                <span className="text-sm font-semibold">
                  1,00,000+ Patients Assisted Since 2016
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-brand-star text-brand-star"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.7 Google Rating</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollTo("quote")}
                data-ocid="hero.primary_button"
                className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-3 text-sm transition-colors flex items-center gap-2"
              >
                Get Free Quote <ArrowRight size={16} />
              </button>
              <a
                href="https://wa.me/919958427958"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.secondary_button"
                className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-8 py-3 text-sm transition-colors flex items-center gap-2"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div id="quote" className="lg:max-w-md w-full">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <div className="bg-primary text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              {
                icon: <Users size={24} />,
                stat: "1,00,000+",
                label: "Patients Assisted",
              },
              {
                icon: <Award size={24} />,
                stat: "500+",
                label: "Accredited Hospital Partners",
              },
              {
                icon: <Globe size={24} />,
                stat: "100+",
                label: "Countries Served",
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="flex items-center gap-4 px-6 py-2"
              >
                <div className="text-white/70">{item.icon}</div>
                <div>
                  <div className="text-2xl font-bold">{item.stat}</div>
                  <div className="text-sm text-white/70">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Destinations ─── */}
      <section id="destinations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Top Medical Destinations
            </h2>
            <p className="text-muted-foreground mt-2">
              Our network spans the top medical tourism hubs worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((d, i) => (
              <button
                type="button"
                key={d.name}
                data-ocid={`destinations.item.${i + 1}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border hover:border-primary hover:shadow-card bg-white transition-all"
              >
                <span className="text-4xl">{d.flag}</span>
                <span className="font-bold text-foreground group-hover:text-primary text-sm">
                  {d.name}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  {d.desc}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {d.patients} patients
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Specialties ─── */}
      <section id="specialties" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Multi-Specialty Focus
            </h2>
            <p className="text-muted-foreground mt-2">
              Expert care across all major medical disciplines
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {specialties.map((s, i) => (
              <div
                key={s.name}
                data-ocid={`specialties.item.${i + 1}`}
                className="flex flex-col items-center gap-2 p-5 rounded-xl bg-white border border-border hover:border-primary hover:shadow-card transition-all cursor-pointer group text-center"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <span className="font-semibold text-sm text-foreground">
                  {s.name}
                </span>
                <span className="text-xs text-muted-foreground">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hospitals ─── */}
      <section id="hospitals" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Network of Top Hospitals
            </h2>
            <p className="text-muted-foreground mt-2">
              Partnered with JCI-accredited hospitals across the globe
            </p>
          </div>
          <Tabs defaultValue="India" data-ocid="hospitals.tab">
            <TabsList className="mb-6 flex-wrap h-auto gap-2 bg-background p-1 rounded-xl">
              {Object.keys(hospitals).map((country) => (
                <TabsTrigger
                  key={country}
                  value={country}
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {country}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(hospitals).map(([country, list]) => (
              <TabsContent key={country} value={country}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {list.map((h, i) => (
                    <div
                      key={h.name}
                      data-ocid={`hospitals.item.${i + 1}`}
                      className="rounded-xl border border-border p-5 bg-white hover:shadow-card hover:border-primary transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Cross size={20} className="text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground text-sm">
                        {h.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin size={12} /> {h.city}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {h.beds} beds
                        </Badge>
                        <Badge className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                          {h.specialty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ─── Treatment Costs ─── */}
      <section id="costs" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Lowest Quotes Assured
            </h2>
            <p className="text-muted-foreground mt-2">
              Transparent pricing — save 60–80% vs. Western countries
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {treatments.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`costs.item.${i + 1}`}
                className="bg-white rounded-xl border border-border p-5 flex flex-col gap-3 hover:shadow-card hover:border-primary transition-all"
              >
                <div className="text-primary">{t.icon}</div>
                <h3 className="font-semibold text-sm text-foreground leading-snug">
                  {t.name}
                </h3>
                <div className="text-primary font-bold text-lg">
                  Starting {t.price}
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo("quote")}
                  data-ocid={`costs.item.${i + 1}.button`}
                  className="mt-auto text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 hover:bg-primary hover:text-white transition-colors"
                >
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How We Work ─── */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              How Do We Work?
            </h2>
            <p className="text-muted-foreground mt-2">
              4 simple steps to world-class treatment
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center gap-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {step.num.slice(1)}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-0.5 bg-primary/20">
                    <ChevronRight
                      className="absolute right-0 -top-2.5 text-primary"
                      size={20}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Our Services Cover Every Need
            </h2>
            <p className="text-muted-foreground mt-2">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                ✓ All Services Are FREE for Patients
              </Badge>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.name}
                data-ocid={`services.item.${i + 1}`}
                className="flex items-center gap-4 bg-white rounded-xl border border-border p-5 hover:shadow-card hover:border-primary transition-all"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {s.icon}
                </div>
                <span className="font-semibold text-sm text-foreground">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Satisfied Patients, Proud Service
            </h2>
            <p className="text-muted-foreground mt-2">
              100,000+ patients have trusted us since 2016
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`testimonials.item.${i + 1}`}
                className="bg-background rounded-xl p-6 border border-border flex flex-col gap-4"
              >
                <StarRating count={t.rating} />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-bold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.flag} {t.country} · {t.treatment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-2">
              Everything you need to know about medical tourism with Sehat Hind
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            data-ocid="faq.panel"
          >
            {faqs.map((faq, faqIdx) => (
              <AccordionItem
                key={faq.q.slice(0, 20)}
                value={`faq-${faqIdx}`}
                data-ocid={`faq.item.${faqIdx + 1}`}
                className="bg-white rounded-xl border border-border px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground text-left hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.26 0.06 210) 0%, oklch(0.50 0.10 185) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center text-white space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Medical Journey?
          </h2>
          <p className="text-white/80">
            Get a FREE medical opinion and cost estimate from top hospitals
            within 48 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo("quote")}
              data-ocid="cta.primary_button"
              className="bg-white text-primary font-bold rounded-full px-8 py-3 text-sm hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              Get Free Quote <ArrowRight size={16} />
            </button>
            <a
              href="https://wa.me/919958427958"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta.secondary_button"
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full px-8 py-3 text-sm transition-colors flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-brand-footer text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Cross size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold">Sehat Hind</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                World&apos;s Most Trusted Medical Travel Assistance Platform.
                Helping patients access affordable, quality healthcare since
                2016.
              </p>
              <div className="flex gap-2">
                <StarRating count={5} />
                <span className="text-xs text-white/60">4.7 Google Rating</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Top Hospitals",
                  "Medical Specialties",
                  "Treatment Cost",
                  "Patient Stories",
                  "Blog",
                  "Contact",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="https://www.sehathind.com"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">
                Medical Specialties
              </h4>
              <ul className="space-y-2">
                {[
                  "Cardiology",
                  "Oncology",
                  "Orthopedics",
                  "Neurosurgery",
                  "IVF & Fertility",
                  "Liver Transplant",
                  "Spine Surgery",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="https://www.sehathind.com"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail size={16} className="text-primary mt-0.5 shrink-0" />
                  <a
                    href="mailto:info@sehathind.com"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    info@sehathind.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle
                    size={16}
                    className="text-green-400 mt-0.5 shrink-0"
                  />
                  <a
                    href="https://wa.me/919958427958"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    WhatsApp: +91 99584 27958
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Globe size={16} className="text-primary mt-0.5 shrink-0" />
                  <a
                    href="https://www.sehathind.com"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    www.sehathind.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Sehat Hind. All rights reserved.</p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "sehathind.com")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
