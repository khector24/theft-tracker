import reports from "../assets/reports.json" assert { type: "json" };

const addReports = async () => {
    const apiUrl = "https://sotr0fimkl.execute-api.us-east-1.amazonaws.com/submit-report";

    for (const report of reports) {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(report),
            });

            if (response.ok) {
                console.log(`Report ${report.id} submitted successfully.`);
            } else {
                console.error(`Error submitting report ${report.id}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error submitting report ${report.id}:`, error);
        }
    }
}

addReports();