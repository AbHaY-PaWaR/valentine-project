import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoseDay from "../component/ui/RoseDay";
import Proposeday from "../component/ui/Proposeday";
import Chocolateday from "../component/ui/Chocolateday";
import Teddyday from "../component/ui/Teddyday";
import Hugday from "../component/ui/Hugday";
import Kissday from "../component/ui/Kissday";
import Valentineday from "../component/ui/Valentineday";
import { getValentine } from "../services/api";
import FloatingHearts from "../component/particles/FloatingHearts";

const ValentineView = () => {
  const navigate = useNavigate();
  const { day, slug } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const dayComponents = useMemo(
    () => ({
      rose: RoseDay,
      propose: Proposeday,
      chocolate: Chocolateday,
      teddy: Teddyday,
      hug: Hugday,
      kiss: Kissday,
      valentine: Valentineday,
    }),
    []
  );

  const DayComponent = dayComponents[(day || "").toLowerCase()];

  useEffect(() => {
    const fetchValentine = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }
      try {
        const { data: res } = await getValentine(slug);
        setData(res);
      } catch (err) {
        setError("Could not load this Valentine. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchValentine();
  }, [slug]);

  return (
    <div className="min-h-screen w-screen bg-secondary">
      <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/10 transition hover:bg-white"
        >
          <span className="text-base">?</span>
          Back to Home
        </button>

        {/* FloatingHearts */}
        <FloatingHearts />

      {isLoading ? (
        <div className="mx-auto max-w-xl px-6 py-16 text-center text-primary-700">
          <p className="text-sm font-body">Loading your Valentine...</p>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-xl px-6 py-16 text-center text-primary-700">
          <h1 className="text-2xl font-heading">Something went wrong</h1>
          <p className="mt-2 text-sm font-body text-primary-600/80">{error}</p>
          <p className="mt-4 text-xs text-primary-500/70">Slug: {slug || "N/A"}</p>
        </div>
      ) : DayComponent ? (
        <DayComponent data={data} />
      ) : (
        <div className="mx-auto max-w-xl px-6 py-16 text-center text-primary-700">
          <h1 className="text-2xl font-heading">Invalid Valentine Day</h1>
          <p className="mt-2 text-sm font-body text-primary-600/80">
            We couldn&apos;t match the day for this link. Please check the URL and try
            again.
          </p>
          <p className="mt-4 text-xs text-primary-500/70">Slug: {slug || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default ValentineView;
