"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Search, Shield, Bug, Globe, Server, Cpu, Database, Network, Lock } from "lucide-react";

const toolCategories = [
  {
    name: "Reconnaissance & Scanning",
    icon: Search,
    color: "text-blue-500",
    tools: [
      "nmap", "RustScan", "Masscan", "Unicornscan", "Amass", "Sublist3r", "Subfinder",
      "Assetfinder", "Gobuster", "FFUF", "Dirb", "Dirsearch", "Wfuzz", "whatweb",
      "dnsrecon", "dnsenum", "fierce", "massdns", "httpx", "nuclei",
    ],
  },
  {
    name: "Exploitation",
    icon: Bug,
    color: "text-red-500",
    tools: [
      "Metasploit Framework", "SQLMap", "BeEF", "Empire", "Starkiller", "Covenant",
      "Sliver", "Mythic", "Havoc", "hydra", "medusa", "patator",
      "John the Ripper", "Hashcat", "hash-identifier",
    ],
  },
  {
    name: "Web Application Testing",
    icon: Globe,
    color: "text-purple-500",
    tools: [
      "Burp Suite Professional", "OWASP ZAP", "Nikto", "WPScan", "JoomScan",
      "Droopescan", "commix", "xsstrike", "NoSQLMap", "jwt_tool", "ssrfmap",
    ],
  },
  {
    name: "Post-Exploitation & Active Directory",
    icon: Server,
    color: "text-orange-500",
    tools: [
      "Mimikatz", "PowerView", "BloodHound", "SharpHound", "Impacket",
      "CrackMapExec", "NetExec", "Responder", "Inveigh", "LDAPDomainDump",
      "ADExplorer", "Powermad", "Kerbrute", "Rubeus", "Certify", "Certipy",
    ],
  },
  {
    name: "Privilege Escalation",
    icon: Shield,
    color: "text-green-500",
    tools: [
      "LinPEAS", "WinPEAS", "Linux-smart-enumeration", "LinEnum", "PEASS-ng",
      "PowerUp", "PrivescCheck", "Seatbelt", "Sherlock", "Watson",
    ],
  },
  {
    name: "Forensics & Memory Analysis",
    icon: Database,
    color: "text-cyan-500",
    tools: [
      "Autopsy", "Sleuth Kit", "Volatility 2 & 3", "Redline", "Velociraptor",
      "FTK Imager", "Bulk Extractor", "binwalk", "foremost", "scalpel", "photorec",
    ],
  },
  {
    name: "Network Analysis",
    icon: Network,
    color: "text-indigo-500",
    tools: [
      "Wireshark", "TShark", "tcpdump", "NetworkMiner", "Chaos Reader",
      "ngrep", "Python Scapy",
    ],
  },
  {
    name: "Reverse Engineering & Malware Analysis",
    icon: Cpu,
    color: "text-yellow-500",
    tools: [
      "Ghidra", "IDA Free", "x64dbg", "x32dbg", "OllyDbg", "dnSpy", "ILSpy",
      "PE-Bear", "Detect It Easy", "Exeinfo PE", "CAPA", "FLOSS", "HxD",
    ],
  },
  {
    name: "Detection Engineering & SOC",
    icon: Shield,
    color: "text-blue-400",
    tools: [
      "Sigma", "SIGMA converter", "YARA", "YARAgen", "Loki", "Thor Lite",
      "osquery", "Velociraptor client", "Auditd", "Sysmon",
    ],
  },
  {
    name: "Exploit Development",
    icon: Terminal,
    color: "text-red-400",
    tools: [
      "pwntools", "ROPgadget", "one_gadget", "msfvenom", "shellcraft",
      "pwndbg", "GEF", "peda",
    ],
  },
  {
    name: "Cloud & Container",
    icon: Lock,
    color: "text-sky-500",
    tools: [
      "aws-cli", "azure-cli", "gcloud", "kubectl", "docker", "docker-compose",
      "trivy", "kube-hunter", "kube-bench",
    ],
  },
];

export default function ToolsPage() {
  const totalTools = toolCategories.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tools & Environments</h1>
        <p className="mt-2 text-muted-foreground">
          Your Attack Box comes pre-loaded with {totalTools}+ industry-standard tools. No installation required.
        </p>
      </div>

      <Card className="mb-8 border-cyber-purple/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-cyber-purple/10 flex items-center justify-center">
              <Terminal className="h-7 w-7 text-cyber-purple" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Attack Box</h2>
              <p className="text-sm text-muted-foreground">
                Full Kali Linux VM in your browser. One-click deployment, zero-latency connection to targets.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyber-purple">{totalTools}+</div>
              <div className="text-xs text-muted-foreground">Pre-installed Tools</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyber-blue">Kali Linux</div>
              <div className="text-xs text-muted-foreground">Base OS</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyber-green">Browser</div>
              <div className="text-xs text-muted-foreground">Access Method</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">Persistent</div>
              <div className="text-xs text-muted-foreground">Workspace</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {toolCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.name}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className={`h-5 w-5 ${category.color}`} />
                  {category.name}
                  <Badge variant="outline" className="ml-auto">{category.tools.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {category.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs font-mono">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
