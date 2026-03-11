import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MembershipTierCard } from "@/components/shared/MembershipTierCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MEMBERSHIP_TIERS, ARTS_SUBCATEGORIES, CULTURE_SUBCATEGORIES, AGRICULTURE_SUBCATEGORIES } from "@/lib/constants";
import { useLocation, COUNTRIES, MERU_SUB_COUNTIES, HARDCODED_SUB_COUNTIES, HARDCODED_WARDS } from "@/hooks/useLocation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Sprout, Palette, Drama, Mail, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Sector = "agriculture" | "arts" | "culture";

const SECTOR_OPTIONS = [
  { id: "agriculture" as Sector, iconComp: Sprout, title: "Agriculture Network", desc: "Join farmers, experts, and advocates." },
  { id: "arts" as Sector, iconComp: Palette, title: "Sanaa Arts Community", desc: "Connect with artists and creatives." },
  { id: "culture" as Sector, iconComp: Drama, title: "Cultural Initiatives", desc: "Preserve heritage and traditions." },
];

const SUBCATEGORIES: Record<Sector, string[]> = {
  agriculture: AGRICULTURE_SUBCATEGORIES,
  arts: ARTS_SUBCATEGORIES,
  culture: CULTURE_SUBCATEGORIES,
};

const SKILL_LEVELS = ["Emerging", "Intermediate", "Professional"];
const INTENT_OPTIONS = ["Learn", "Teach", "Collaborate", "Earn"];

export default function Membership() {
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState<Sector | "">("");
  const [subcategory, setSubcategory] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [intent, setIntent] = useState<string[]>([]);
  const [tier, setTier] = useState<"free" | "supporter" | "premium">("free");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", location: "", bio: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  
  // Location state
  const { counties, subCounties, wards, loadingCounties, loadingSubCounties, loadingWards, fetchCounties, fetchSubCounties, fetchWards, clearSubCounties, clearWards } = useLocation();
  const [country, setCountry] = useState("Kenya");
  const [county, setCounty] = useState("");
  const [subCounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [otherCountry, setOtherCountry] = useState("");
  
  // Load counties on mount
  useEffect(() => {
    fetchCounties();
  }, [fetchCounties]);

  const canNext = () => {
    switch (step) {
      case 1: return !!sector;
      case 2: return !!subcategory;
      case 3: return !!tier;
      case 4: 
        // Location validation - required if Kenya is selected
        if (country === "Kenya") {
          return !!county && !!subCounty && !!ward;
        } else if (country === "Other") {
          return !!otherCountry;
        }
        return true;
      case 5: return !!profile.name && !!profile.email && profile.password.length >= 6;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    if (!sector) return;
    setSubmitting(true);
    try {
      // 1. Sign up with email verification
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: profile.email,
        password: profile.password,
        options: {
          data: { full_name: profile.name },
          emailRedirectTo: window.location.origin,
        },
      });
      if (authError) throw authError;

      // 3. Insert membership using security definer function (bypasses RLS for unconfirmed users)
      const { error: memberError } = await supabase.rpc("create_membership", {
        p_user_id: authData.user?.id,
        p_sector: sector as "agriculture" | "arts" | "culture",
        p_subcategory: subcategory,
        p_tier: tier,
        p_skill_level: skillLevel || null,
        p_intent: intent.length > 0 ? intent : null,
        p_status: "pending" as const,
        p_approved: false,
      });

      if (memberError) {
        console.error("Member insert error:", memberError);
        throw memberError;
      }

      // 4. Update profile with extra info
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").update({
          phone: profile.phone || null,
          location: profile.location || null,
          bio: profile.bio || null,
        }).eq("user_id", authData.user.id);
        if (profileError) {
          console.error("Profile update error:", profileError);
          throw profileError;
        }
      }

      setStep(7);
    } catch (err: any) {
      const errorMessage = err.message || err.error || "Failed to create account";
      console.error("Registration error details:", {
        message: errorMessage,
        status: err.status,
        statusText: err.statusText,
        details: err.details,
        hint: err.hint
      });
      toast.error(errorMessage);
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Join HVN</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Become part of a movement transforming communities across Kenya.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step > s ? "bg-primary text-primary-foreground" : step === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 6 && <div className={`w-8 md:w-16 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Sector */}
          {step === 1 && (
            <div>
              <SectionHeading title="Choose Your Sector" subtitle="Which area resonates with you?" />
              <div className="grid md:grid-cols-3 gap-6">
                {SECTOR_OPTIONS.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSector(s.id)}
                    className={`cursor-pointer rounded-xl border-2 p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                      sector === s.id ? "border-primary bg-primary/5 shadow-lg" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex justify-center mb-3">
                      <s.iconComp className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Subcategory + Skill + Intent */}
          {step === 2 && sector && (
            <div className="space-y-6">
              <SectionHeading title="Tell Us More" subtitle="Help us match you with the right community." />
              <div>
                <label className="text-sm font-medium mb-2 block">Select Subcategory</label>
                <Select value={subcategory} onValueChange={setSubcategory}>
                  <SelectTrigger><SelectValue placeholder="Choose your specialty" /></SelectTrigger>
                  <SelectContent>
                    {SUBCATEGORIES[sector].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Skill Level</label>
                <div className="flex gap-3">
                  {SKILL_LEVELS.map((sl) => (
                    <Button key={sl} variant={skillLevel === sl ? "default" : "outline"} size="sm" onClick={() => setSkillLevel(sl)}>{sl}</Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">What do you want to do?</label>
                <div className="flex flex-wrap gap-2">
                  {INTENT_OPTIONS.map((opt) => (
                    <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <Checkbox
                        checked={intent.includes(opt)}
                        onCheckedChange={() => setIntent((prev) => prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt])}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Tier */}
          {step === 3 && (
            <div>
              <SectionHeading title="Choose Your Tier" subtitle="Select the membership level that fits your needs." />
              <div className="grid md:grid-cols-3 gap-6">
                {MEMBERSHIP_TIERS.map((t) => (
                  <MembershipTierCard
                    key={t.id}
                    {...t}
                    popular={t.id === "supporter"}
                    selected={tier === t.id}
                    onSelect={() => setTier(t.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Location */}
          {step === 4 && (
            <div>
              <SectionHeading title="Your Location" subtitle="Tell us where you're located." />
              <div className="space-y-4 max-w-md mx-auto">
                {/* Country */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Country *</label>
                  <Select value={country} onValueChange={(val) => {
                    setCountry(val);
                    clearSubCounties();
                    clearWards();
                    setCounty("");
                    setSubCounty("");
                    setWard("");
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Other country input */}
                {country === "Other" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Specify Country *</label>
                    <Input 
                      placeholder="Enter your country" 
                      value={otherCountry} 
                      onChange={(e) => setOtherCountry(e.target.value)} 
                      required 
                    />
                  </div>
                )}

                {/* Kenya-specific location fields */}
                {country === "Kenya" && (
                  <>
                    {/* County */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">County *</label>
                      <Select 
                        value={county} 
                        onValueChange={(val) => {
                          setCounty(val);
                          clearSubCounties();
                          clearWards();
                          setSubCounty("");
                          setWard("");
                          // Find county and fetch sub-counties
                          const selectedCounty = counties.find(c => c.name === val);
                          if (selectedCounty) {
                            fetchSubCounties(selectedCounty.id);
                          }
                        }}
                        disabled={loadingCounties}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={loadingCounties ? "Loading..." : "Select county"} />
                        </SelectTrigger>
                        <SelectContent>
                          {counties.map((c) => (
                            <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sub-County - with fallback data */}
                    {county && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Sub-County *</label>
                        <Select 
                          value={subCounty} 
                          onValueChange={(val) => {
                            setSubCounty(val);
                            clearWards();
                            setWard("");
                            // Find sub-county and fetch wards
                            const selectedSub = subCounties.find(s => s.name === val);
                            if (selectedSub) {
                              fetchWards(selectedSub.id);
                            } else {
                              // Try to find in fallback data
                              const fallbackSub = MERU_SUB_COUNTIES.find(s => s.name === val);
                              if (fallbackSub) {
                                fetchWards(fallbackSub.id);
                              }
                            }
                          }}
                          disabled={loadingSubCounties}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={loadingSubCounties ? "Loading..." : "Select sub-county"} />
                          </SelectTrigger>
                          <SelectContent>
                            {subCounties.length > 0 ? subCounties.map((sc) => (
                              <SelectItem key={sc.id} value={sc.name}>{sc.name}</SelectItem>
                            )) : (
                              // Show fallback sub-counties - need to find the county_id first
                              (() => {
                                const selectedCountyObj = counties.find(c => c.name === county);
                                const countyId = selectedCountyObj?.id || 1;
                                return HARDCODED_SUB_COUNTIES.filter(sc => sc.county_id === countyId).map((sc) => (
                                  <SelectItem key={sc.id} value={sc.name}>{sc.name}</SelectItem>
                                ));
                              })()
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Ward - with fallback data */}
                    {subCounty && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ward *</label>
                        <Select 
                          value={ward} 
                          onValueChange={setWard}
                          disabled={loadingWards}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={loadingWards ? "Loading..." : "Select ward"} />
                          </SelectTrigger>
                          <SelectContent>
                            {wards.length > 0 ? wards.map((w) => (
                              <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>
                            )) : (
                              // Show fallback wards based on selected sub-county
                              (() => {
                                // First try to find the sub-county in the database-loaded subCounties
                                const selectedSub = subCounties.find(s => s.name === subCounty);
                                let subCountyId = selectedSub?.id;
                                
                                // If not found, try the fallback data
                                if (!subCountyId) {
                                  const fallbackSub = HARDCODED_SUB_COUNTIES.find(s => s.name === subCounty);
                                  subCountyId = fallbackSub?.id;
                                }
                                
                                // Filter wards by the found sub-county ID
                                if (subCountyId) {
                                  const filteredWards = HARDCODED_WARDS.filter(w => w.sub_county_id === subCountyId);
                                  return filteredWards.map((w) => (
                                    <SelectItem key={w.id} value={w.name}>{w.name}</SelectItem>
                                  ));
                                }
                                return null;
                              })()
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </>
                )}

                {/* Location summary */}
                {(country === "Kenya" && county && subCounty && ward) && (
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {ward}, {subCounty}, {county}, {country}
                    </span>
                  </div>
                )}
                {(country === "Other" && otherCountry) && (
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{otherCountry}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Profile + Password */}
          {step === 5 && (
            <div>
              <SectionHeading title="Your Profile" subtitle="Create your account to join." />
              <div className="space-y-4 max-w-md mx-auto">
                <Input placeholder="Full Name *" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
                <Input type="email" placeholder="Email *" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
                <div>
                  <Input type="password" placeholder="Password * (min 6 characters)" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} required />
                  {profile.password.length > 0 && profile.password.length < 6 && (
                    <p className="text-xs text-destructive mt-1">Password must be at least 6 characters</p>
                  )}
                </div>
                <Input placeholder="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                <Textarea placeholder="Short bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {step === 6 && (
            <div>
              <SectionHeading title="Review & Confirm" subtitle="Make sure everything looks right." />
              <div className="bg-card rounded-xl border p-6 max-w-md mx-auto space-y-3">
                <div><span className="text-sm text-muted-foreground">Sector:</span> <span className="font-medium capitalize">{sector}</span></div>
                <div><span className="text-sm text-muted-foreground">Subcategory:</span> <span className="font-medium">{subcategory}</span></div>
                {skillLevel && <div><span className="text-sm text-muted-foreground">Skill Level:</span> <span className="font-medium">{skillLevel}</span></div>}
                <div><span className="text-sm text-muted-foreground">Tier:</span> <span className="font-medium capitalize">{tier}</span></div>
                <div><span className="text-sm text-muted-foreground">Name:</span> <span className="font-medium">{profile.name}</span></div>
                <div><span className="text-sm text-muted-foreground">Email:</span> <span className="font-medium">{profile.email}</span></div>
                {/* Location */}
                {country === "Kenya" && county && (
                  <div><span className="text-sm text-muted-foreground">Location:</span> <span className="font-medium">{ward ? `${ward}, ` : ''}{subCounty}, {county}, Kenya</span></div>
                )}
                {country === "Other" && otherCountry && (
                  <div><span className="text-sm text-muted-foreground">Location:</span> <span className="font-medium">{otherCountry}</span></div>
                )}
                {tier !== "free" && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground">Payment: KES {MEMBERSHIP_TIERS.find((t) => t.id === tier)?.price?.toLocaleString()}/month</p>
                    <p className="text-xs text-muted-foreground italic">Payment processing coming soon</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Success */}
          {step === 7 && (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Mail className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Check Your Email!</h2>
              <p className="text-muted-foreground mb-2 max-w-md mx-auto">
                We've sent a verification link to <strong>{profile.email}</strong>.
              </p>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                Please verify your email, then an admin will review and approve your membership. You'll be notified once approved.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.href = "/"}>Go Home</Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step >= 1 && step <= 6 && (
            <div className="flex justify-between mt-12">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {step < 6 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Creating Account..." : "Confirm & Join"} <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
