"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    gameTitle: "Free Fire",
    image: "",
    description: "",
    entryFee: 0,
    maxTeams: 16,
    minTeamSize: 1,
    maxTeamSize: 4,
    streamLink: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          entryFee: Number(form.entryFee),
          maxTeams: Number(form.maxTeams),
          minTeamSize: Number(form.minTeamSize),
          maxTeamSize: Number(form.maxTeamSize),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create tournament");
      }

      router.push("/admin/dashboard");
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-headline font-bold mb-6 text-foreground">
        Create Tournament
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-foreground font-semibold mb-1">
            Tournament Name
          </label>
          <input
            name="name"
            placeholder="e.g. Nexus Cup"
            className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={form.name}
            onChange={handleChange}
            required
            minLength={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter the official name of the tournament (min 3 characters).
          </p>
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-1">
            Game Title
          </label>
          <input
            name="gameTitle"
            placeholder="e.g. Free Fire"
            className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={form.gameTitle}
            onChange={handleChange}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            The game for this tournament (e.g. Free Fire, BGMI, Valorant).
          </p>
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-1">
            Image URL <span className="text-xs text-muted-foreground">(optional)</span>
          </label>
          <input
            name="image"
            placeholder="Tournament banner image URL"
            className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={form.image}
            onChange={handleChange}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Paste a link to the tournament banner or logo.
          </p>
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe the tournament, rules, etc."
            className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={form.description}
            onChange={handleChange}
            required
            minLength={10}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Add any details, rules, or highlights for this tournament.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground font-semibold mb-1">
              Start Date
            </label>
            <input
              name="startDate"
              type="date"
              className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tournament start date.
            </p>
          </div>
          <div>
            <label className="block text-foreground font-semibold mb-1">
              End Date
            </label>
            <input
              name="endDate"
              type="date"
              className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={form.endDate}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tournament end date.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground font-semibold mb-1">
              Min Team Size
            </label>
            <input
              name="minTeamSize"
              type="number"
              className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={form.minTeamSize}
              onChange={handleNumberChange}
              min={1}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum players per team.
            </p>
          </div>
          <div>
            <label className="block text-foreground font-semibold mb-1">
              Max Team Size
            </label>
            <input
              name="maxTeamSize"
              type="number"
              className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={form.maxTeamSize}
              onChange={handleNumberChange}
              min={1}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Maximum players per team.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground font-semibold mb-1">
              Entry Fee (INR)
            </label>
            <input
              name="entryFee"
              type="number"
              className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={form.entryFee}
              onChange={handleNumberChange}
              min={0}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Fee per team to enter the tournament.
            </p>
          </div>
          <div>
            <label className="block text-foreground font-semibold mb-1">
              Max Teams
            </label>
            <input
              name="maxTeams"
              type="number"
              className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={form.maxTeams}
              onChange={handleNumberChange}
              min={1}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Maximum number of teams allowed to register.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-1">
            Stream Link (optional)
          </label>
          <input
            name="streamLink"
            placeholder="YouTube or Twitch link"
            className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={form.streamLink}
            onChange={handleChange}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Paste the live stream link if available.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full font-semibold text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Tournament"}
        </Button>
      </form>
    </div>
  );
}