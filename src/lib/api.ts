export async function fetchProjects() {
  try {
    // sementara masih dummy data dulu
    const data = [
      { title: "Digital Stethoscope", subtitle: "Visual Observation Heart Sounds", image: "/images/thumbnail.png", category: "Research Projects" },
      { title: "SiHEDAF", subtitle: "Atrial Fibrillation Detector", image: "/images/thumbnail.png", category: "Research Projects" },
      { title: "Antropometri Kit", subtitle: "Observations of Weight, Height, Head Circumference...", image: "/images/thumbnail.png", category: "Internship Projects" },
      { title: "AMons", subtitle: "Arrhythmia Monitoring System", image: "/images/thumbnail.png", category: "Research Projects" },
    ];

    // nanti tinggal ubah ke fetch('https://api.example.com/projects')
    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}