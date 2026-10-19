import Navbar_main from "./Navbar_main.jsx"
import { Shield } from "lucide-react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { FileText } from "lucide-react";
import { Circle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  CloudUpload,
  BookOpen,
  MapPin,
  DollarSign,
  MessageSquare,
} from "lucide-react";
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={120}
        thickness={2}
        sx={{ color: "#e1e7ee", position: "absolute" }}
      />
      {/* Turquoise score ring */}
      <CircularProgress
        variant="determinate"
        value={props.value}
        size={120}
        thickness={2}
        sx={{
          color:
            props.value < 40
              ? "#EF4444"
              : props.value <= 70
                ? "#F59E0B"
                : "#00C9A7",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Typography
          sx={{
            fontSize: 36,
            fontFamily: "Georgia",
            color: "#14243b",
            lineHeight: 1.1,
          }}
        >
          {Math.round(props.value)}
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            color:
              props.value < 40
                ? "#EF4444"
                : props.value <= 70
                  ? "#F59E0B"
                  : "#00C9A7",
            mt: 0.5,
          }}
        >
          {props.value < 40
            ? "Low"
            : props.value <= 70
              ? "Moderate"
              : "Excellent"}
        </Typography>
      </Box>
    </Box>
  );
}

const ContributingFactor=({factor,info})=>{
  return (
    <div className="border px-5 py-3 rounded-xl">
      <p className="font-serif font-semibold text-black/80">{factor}</p>
      <p className="text-black/60">{info}</p>
    </div>
  );
}

const ReportsGrid = ({ documentName, documentDate,documentStatus }) => {
  return (
    <div className="flex justify-between px-5 py-3 border rounded-xl items-center">
      <div className="flex gap-5 items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <FileText size={18} className="text-emerald-500" />
        </div>
        <div className="flex flex-col">
          <p className="font-serif font-semibold text-black/80">
            {documentName}
          </p>
          <p className="text-black/60">{documentDate}</p>
        </div>
      </div>
      <div>
        <p
          className={`${documentStatus === "Action Required" ? "text-[#F59E0B] bg-[#F59E0B]/20  border-[#F59E0B]" : documentStatus === "Completed" ? "text-[#00C9A7] bg-[#00C9A7]/20 border-[#00C9A7]" : "text-black/60 bg-black/10 border-black/60"} px-2 py-1 border-2 font-serif rounded-lg`}
        >
          {documentStatus}
        </p>
      </div>
    </div>
  );
};

const QuickActions=({actionIcon:ActionIcon,actionName,to})=>{
  return(
  <Link to={to} className="flex py-5 px-10 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50">
      <ActionIcon size={30} className="text-teal-500" strokeWidth={2} />
    </div>

    <p className="text-sm font-serif font-semibold text-black/80">{actionName}</p>
  </Link>
  )
}
const RecentActivity=({activityTitle,info,activityDate})=>{
  return (
    <div className="flex gap-2">
      <div>
        <Circle size={8} fill="currentColor" className="text-[#00C9A7]" />
      </div>
      <div className="flex flex-col">
        <p className="font-serif font-semibold text-black/80">
          {activityTitle}
        </p>
        <p className="text-black/60">{info}</p>
        <p className="text-black/60">{activityDate}</p>
      </div>
    </div>
  );
}
const Dashboard = () => {
  const [risk, setRisk] = useState("Moderate");

  return (
    <div className="flex flex-col gap-8">
      <div className="sticky top-0 z-50 w-full">
        <Navbar_main />
      </div>
      <div className="flex justify-between px-12 items-center">
        <div>
          <h1 className="font-serif text-5xl">Good Morning, Alexandra</h1>
          <p className="text-base text-black/60 tracking-wider py-2">
            Tuesday, October 15, 2024 • Your health profile is up to date.
          </p>
        </div>
        <div>
          <h3 className="text-base rounded-xl w-fit px-3 py-1 bg-[#00C9A7]/10 text-[#00C9A7] flex items-center">
            <Shield className="text-[#00C9A7]" />
            &nbsp; HIPAA Secured Profile
          </h3>
        </div>
      </div>
      <div className="w-full flex gap-5 px-8">
        <div className="border-2 rounded-xl p-5 flex flex-col gap-3 w-1/3 shadow-sm">
          <p className="text-black/60 font-serif tracking-wider text-xl">
            Health Score
          </p>
          <div className="flex justify-center py-2">
            <CircularProgressWithLabel value={65} />
          </div>
          <p className="text-black/60 font-serif text-center">
            Your indicators show 4% improvement this month, driven by consistent
            physical activity and optimal sleep.
          </p>
        </div>
        <div className="border-2 rounded-xl w-2/3 flex flex-col gap-5 px-8 shadow-sm py-5">
          <div className="w-full flex justify-between items-center">
            <p className="text-black/60 font-serif tracking-wider text-xl">
              Latest Assessment Analysis
            </p>
            <p className="text-black/60 font-serif tracking-wider text-sm">
              Completed 3 days ago
            </p>
          </div>
          <p className="font-serif text-black/80">
            <span
              className={`${risk === "Moderate" ? "text-[#F59E0B] bg-[#F59E0B]/20 border-[#F59E0B]" : risk === "High" ? "text-red-600 bg-red-600/20 border-red-600" : "text-[#00C9A7] bg-[#00C9A7]/20 border-[#00C9A7]"} p-2 border-2 font-serif font-semibold rounded-xl `}
            >
              {risk} Risk
            </span>
            &nbsp;&nbsp; Based on reported persistent headaches and elevated
            stress levels.
          </p>
          <hr />
          <p className="text-black/60 font-serif tracking-wider text-xl">
            Primary Contributing Factors
          </p>
          <div className="flex flex-wrap gap-5">
            <ContributingFactor
              factor="Screen Fatigue"
              info="6h+ consecutive daily screen time"
            />
            <ContributingFactor
              factor="Mild Dehydration"
              info="6h+ consecutive daily screen time"
            />
            <ContributingFactor
              factor="Stress Level"
              info="6h+ consecutive daily screen time"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-8 flex gap-5">
        <div className="border-2 rounded-xl w-2/3 flex flex-col gap-5 px-8 shadow-sm py-5">
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-3xl">Recent Medical Reports</h1>
            <Link to="/MedicalReports" className="text-[#00C9A7]">
              View all reports →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <ReportsGrid
              documentName="Annual Physical Labs"
              documentDate="Oct 10, 2024"
              documentStatus="Completed"
            />
            <ReportsGrid
              documentName="Symptom Analysis Report"
              documentDate="Oct 05, 2024"
              documentStatus="Reviewed"
            />
            <ReportsGrid
              documentName="Cardiology Consult Summary"
              documentDate="Sep 28, 2024"
              documentStatus="Action Required"
            />
          </div>
        </div>
        <div className="w-1/3 border-2 rounded-xl flex flex-col gap-5 px-8 shadow-sm py-5">
          <h1 className="font-serif text-3xl">Recent Activity</h1>
          <RecentActivity
            activityTitle="Completed Health Assessment"
            info="Tension headache parameters flagged."
            activityDate="3 days ago"
          />
          <RecentActivity
            activityTitle="Completed Health Assessment"
            info="Tension headache parameters flagged."
            activityDate="3 days ago"
          />
          <RecentActivity
            activityTitle="Completed Health Assessment"
            info="Tension headache parameters flagged."
            activityDate="3 days ago"
          />
        </div>
      </div>
      <p className="text-xl text-black/60 tracking-wider pt-2 font-bold px-8">
        QUICK ACTIONS
      </p>
      <div className="flex justify-between px-8 pb-10">
        <QuickActions
          actionIcon={Activity}
          actionName="New Assessment"
          to="/HealthAssesment"
        />
        <QuickActions
          actionIcon={CloudUpload}
          actionName="Upload Reports"
          to="/MedicalReports"
        />
        <QuickActions
          actionIcon={BookOpen}
          actionName="Health Guidance"
          to="/Guidance"
        />
        <QuickActions
          actionIcon={MapPin}
          actionName="Find Healthcare"
          to="/HealthCare"
        />
        <QuickActions
          actionIcon={DollarSign}
          actionName="Cost Estimator"
          to="/CostEstimator"
        />
        <QuickActions
          actionIcon={MessageSquare}
          actionName="Ask Healix"
          to="/AskHealix"
        />
      </div>
    </div>
  );
}
export default Dashboard
