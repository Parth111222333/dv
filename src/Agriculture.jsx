import Report from './Report';


import React, { useState, useRef } from "react";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Button,
    Box,
    Paper,
} from "@mui/material";

import html2pdf from "html2pdf.js";


const Agriculture = () => {
    const [formData, setFormData] = useState({
        owner_name: "",
        gut_no: "",
        address: "",
        bank_name: "",
        property_type: "",
        classification: "",
        development_area: "",
        flood_possibility: "",
        civic_amenities: "",
        communication: "",
        present_use: "",
        // electricity: "",
        water: "",
        area: "",
        shape: "",
        demarcation: "",
        frontage_road: "",
        plot_surface: "",
        surface_type: "",
        na_status: "",
        title: "",
        direction: "",
        east: "",
        west: "",
        south: "",
        north: "",
        // plot_no: "",
        location: "",
        grampanchayat: "",
        document_inspected: "",
        fmv: "",
        valuation_words: "",
        realizable_value: "",
        distress_value: "",
        crop: "",

        date_of_visit: "",
        year_range: "",

        government_valuation: "",


        guts: [
            { gut_no1: "", east: "", west: "", north: "", south: "" }, // Gut 1
            { gut_no2: "", east: "", west: "", north: "", south: "" }, // Gut 2
            { gut_no3: "", east: "", west: "", north: "", south: "" }, // Gut 3
            { gut_no4: "", east: "", west: "", north: "", south: "" }, // Gut 4
        ],

    });

    const numberToWords = (num) => {
        if (!num || isNaN(num)) return "";
        const a = [
            "", "One", "Two", "Three", "Four", "Five", "Six",
            "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
            "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen",
        ];
        const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty",
            "Seventy", "Eighty", "Ninety"];
        const inWords = (n) => {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
            if (n < 1000)
                return (
                    a[Math.floor(n / 100)] +
                    " Hundred" +
                    (n % 100 ? " and " + inWords(n % 100) : "")
                );
            if (n < 100000)
                return (
                    inWords(Math.floor(n / 1000)) +
                    " Thousand" +
                    (n % 1000 ? " " + inWords(n % 1000) : "")
                );
            if (n < 10000000)
                return (
                    inWords(Math.floor(n / 100000)) +
                    " Lakh" +
                    (n % 100000 ? " " + inWords(n % 100000) : "")
                );
            return (
                inWords(Math.floor(n / 10000000)) +
                " Crore" +
                (n % 10000000 ? " " + inWords(n % 10000000) : "")
            );
        };
        return inWords(Math.floor(num)) + " Rupees Only";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let rawValue = value;

        if (name === "fmv") {
            rawValue = value.replace(/[^0-9.]/g, ""); // ✅ allow decimals
        }

        let updated = { ...formData, [name]: rawValue };

        if (name === "fmv") {
            const fmvNum = parseFloat(rawValue);
            if (!isNaN(fmvNum)) {
                updated.realizable_value = (fmvNum * 0.95).toFixed(2);
                updated.distress_value = (fmvNum * 0.70).toFixed(2);
                updated.valuation_words = numberToWords(fmvNum);
            } else {
                updated.realizable_value = "";
                updated.distress_value = "";
                updated.valuation_words = "";
            }
        }

        setFormData(updated);
    };


    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Clean value: remove commas and non digits except dot
        const raw = value.replace(/,/g, "").replace(/[^0-9.]/g, "");
        const num = parseFloat(raw);
        if (isNaN(num)) return;

        // const formatted = num.toLocaleString("en-IN", {
        //   minimumFractionDigits: 2,
        //   maximumFractionDigits: 2,
        // });

        // setFormData((prev) => ({
        //   ...prev,
        //   [name]: formatted,
        // }));
    };

    const reportRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // List of fields that are OPTIONAL (all others will be treated as required)
        const optionalFields = ["east", "west", "south", "north"];

        // Check for empty fields except optional ones
        const emptyField = Object.keys(formData).find((field) => {
            if (optionalFields.includes(field)) return false;

            const value = formData[field];

            if (typeof value === "string") {
                return value.trim() === "";
            }

            return value === null || value === undefined || value === "";
        });


        console.log("✅ Form submitted:", formData);

        // 2. Generate PDF
        const element = reportRef.current;
        if (!element) {
            console.error("reportRef is null");
            return;
        }

        const opt = {
            margin: 10,
            filename: `Agri_valuation_${formData.owner_name || "report"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ["css", "legacy"] },
        };

        try {
            html2pdf().set(opt).from(element).save();
        } catch (err) {
            console.error("Error generating PDF:", err);
        }
    };




    const handleGutChange = (index, field, value) => {
        const updatedGuts = [...formData.guts];
        updatedGuts[index][field] = value;
        setFormData({ ...formData, guts: updatedGuts });
    };


    return (
        <Box sx={{ bgcolor: "#71a5abff", minHeight: "100vh", p: 40, py: 2, }}   >


            <Typography variant="h4" gutterBottom sx={{ color: "#340ef6ff", fontWeight: "bold", textAlign: "center", position: 'static', }}>
                Valuation Report Form D.V. Shinde
            </Typography>


            <form onSubmit={handleSubmit}>

                {/* <Paper sx={{
          // p: 4, mb: 3,
          //  width: "300%",
          maxWidth: "1200px",
        }}> */}
                <div className="section">


                    <TextField
                        fullWidth
                        margin="normal"
                        label="Owner Name"
                        name="owner_name"
                        value={formData.owner_name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="G.NO."
                        name="gut_no"
                        value={formData.gut_no}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Address"
                        name="address"
                        multiline
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Bank Name</InputLabel>
                        <Select
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="">Select Bank</MenuItem>
                            <MenuItem value="Palus Sahakari Bank ltd. Palus, Main branch Palus">Palus Sahakari Bank ltd. Palus, Main branch Palus</MenuItem>
                            <MenuItem value="Palus Sahakari Bank ltd. Palus, branch Kirloskarwadi">Palus Sahakari Bank ltd. Palus, branch Kirloskarwadi</MenuItem>
                            <MenuItem value="Palus Sahakari Bank ltd. Palus, branch Kundal">Palus Sahakari Bank ltd. Palus, branch Kundal</MenuItem>
                            <MenuItem value="Palus Sahakari Bank ltd. Palus, branch Bhilawadi">Palus Sahakari Bank ltd. Palus, branch Bhilawadi</MenuItem>
                            <MenuItem value="Palus Sahakari Bank ltd. Palus, branch Bambavade">Palus Sahakari Bank ltd. Palus, branch Bambavade</MenuItem>
                            <MenuItem value="Palus Sahakari Bank ltd. Palus, branch Tasgaon">Palus Sahakari Bank ltd. Palus, branch Tasgaon</MenuItem>
                            <MenuItem value="Mamasaheb Pawar Satyavijay co.op.bank.ltd. main road kundal">Mamasaheb Pawar Satyavijay co.op.bank.ltd. main road kundal</MenuItem>
                            <MenuItem value="Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Palus">Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Palus</MenuItem>
                            <MenuItem value="Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Sawantpur Vasahat">Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Sawantpur Vasahat</MenuItem>
                            <MenuItem value="Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Ankalkhop">Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Ankalkhop</MenuItem>
                            <MenuItem value="Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Takari">Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Takari</MenuItem>
                            <MenuItem value="Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Tasgaon">Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Tasgaon</MenuItem>
                            <MenuItem value="Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Savlaj">Mamasaheb Pawar Satyavijay co.op.bank.ltd.Kundal ,branch Savlaj</MenuItem>
                            <MenuItem value="Mansing Co-operative Bank Ltd.Dudhondi,main branch Dudhondi">Mansing Co-operative Bank Ltd.Dudhondi,main branch Dudhondi</MenuItem>
                            <MenuItem value="Mansing Co-operative Bank Ltd.Dudhondi, branch Palus">Mansing Co-operative Bank Ltd.Dudhondi, branch Palus</MenuItem>
                            <MenuItem value="Mansing Co-operative Bank Ltd.Dudhondi,branch Vita">Mansing Co-operative Bank Ltd.Dudhondi,branch Vita</MenuItem>
                            <MenuItem value="Mansing Co-operative Bank Ltd.Dudhondi,branch Sangli">Mansing Co-operative Bank Ltd.Dudhondi,branch Sangli</MenuItem>
                            <MenuItem value="Mansing Co-operative Bank Ltd.Dudhondi,branch Karad">Mansing Co-operative Bank Ltd.Dudhondi,branch Karad</MenuItem>
                            <MenuItem value="The Tasgaon Urban Co-Operative Bank Ltd Tasgaon,main branch Tasgaon">The Tasgaon Urban Co-Operative Bank Ltd Tasgaon,main branch Tasgaon</MenuItem>
                            <MenuItem value="The Tasgaon Urban Co-Operative Bank Ltd Tasgaon,branch Palus">The Tasgaon Urban Co-Operative Bank Ltd Tasgaon,branch Palus</MenuItem>
                            <MenuItem value="Choundeshwari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus">Choundeshwari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus</MenuItem>
                            <MenuItem value="Shree Choundeshwari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Vita">Shree Choundeshwari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Vita</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Sawantpur Vasahat">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Sawantpur Vasahat</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Bhilawadi">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Bhilawadi</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Malwadi">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Malwadi</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Tasgaon">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Tasgaon</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Alsand">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Alsand</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Manerajuri">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Manerajuri</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Sangli">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Sangli</MenuItem>
                            <MenuItem value="Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Savlaj">Bapusaheb Yesugade Sangram Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Savlaj</MenuItem>
                            <MenuItem value="Shri Dhondiraj Maharaj Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Palus">Shri Dhondiraj Maharaj Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch Palus</MenuItem>
                            <MenuItem value="Shri Dhondiraj Maharaj Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch city branch">Shri Dhondiraj Maharaj Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch city branch</MenuItem>
                            <MenuItem value="Shri Ganesh Nagari Sahakari PatSanstha Maryadit Aashta,main branch Aashta">Shri Ganesh Nagari Sahakari PatSanstha Maryadit Aashta,main branch Aashta</MenuItem>
                            <MenuItem value="Shri Ganesh Nagari Sahakari PatSanstha Maryadit Aashta,branch Palus">Shri Ganesh Nagari Sahakari PatSanstha Maryadit Aashta,branch Palus</MenuItem>
                            <MenuItem value="Shri Ganesh Nagari Sahakari PatSanstha Maryadit Aashta,branch Ramanandnagar">Shri Ganesh Nagari Sahakari PatSanstha Maryadit Aashta,branch Ramanandnagar</MenuItem>
                            <MenuItem value="Shree Laxmi Nagari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus">Shree Laxmi Nagari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus</MenuItem>
                            <MenuItem value="Shree Laxmi Nagari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch main road Palus">Shree Laxmi Nagari Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch main road Palus</MenuItem>
                            <MenuItem value="Hutatma sahakari Bank Ltd Walwa,main branch Walwa">Hutatma sahakari Bank Ltd Walwa,main branch Walwa</MenuItem>
                            <MenuItem value="Hutatma sahakari Bank Ltd Walwa,branch Palus">Hutatma sahakari Bank Ltd Walwa,branch Palus</MenuItem>
                            <MenuItem value="Arihant Urban Credit Co-operative Society Ltd.Palus,main branch Palus">Arihant Urban Credit Co-operative Society Ltd.Palus,main branch Palus</MenuItem>
                            <MenuItem value="Arihant Urban Credit Co-operative Society Ltd.Palus,branch Malwadi">Arihant Urban Credit Co-operative Society Ltd.Palus,branch Malwadi</MenuItem>
                            <MenuItem value="Shree Sant Gadgebaba Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus">Shree Sant Gadgebaba Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus</MenuItem>
                            <MenuItem value="Shree Jay Bhavani Gramin Bigar Sheti Sahakari Patsanstha Maryadit Sandagewadi">Shree Jay Bhavani Gramin Bigar Sheti Sahakari Patsanstha Maryadit Sandagewadi</MenuItem>
                            <MenuItem value="Kranti Urban Credit Co-Operative Society Ltd Palus,main branch Palus">Kranti Urban Credit Co-Operative Society Ltd Palus,main branch Palus</MenuItem>
                            <MenuItem value="Kranti Urban Credit Co-Operative Society Ltd Palus,branch Wangi">Kranti Urban Credit Co-Operative Society Ltd Palus,branch Wangi</MenuItem>
                            <MenuItem value="Janseva Credit Co-Operative Society Ltd Kundal,main branch Kunadal">Janseva Credit Co-Operative Society Ltd Kundal,main branch Kunadal</MenuItem>
                            <MenuItem value="Janseva Credit Co-Operative Society Ltd Kundal,branch Palus">Janseva Credit Co-Operative Society Ltd Kundal,branch Palus</MenuItem>
                            <MenuItem value="Sanmitra Gramin Bigar Sheti Sahakari Patsanstha Maryadit Ramanandnagar">Sanmitra Gramin Bigar Sheti Sahakari Patsanstha Maryadit Ramanandnagar</MenuItem>
                            <MenuItem value="Samajseva Gramin Bigar Sheti Sahakari Patsanstha Maryadit Kundal">Samajseva Gramin Bigar Sheti Sahakari Patsanstha Maryadit Kundal</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>

                        </Select>
                    </FormControl>
                </div>
                {/* </Paper> */}

                {/* Section 2: Land Info */}
                <div className="section">
                    <h3>Land Info</h3>


                    <TextField
                        type="date"
                        name="date_of_visit"
                        value={formData.date_of_visit}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        margin="normal"
                        required
                    />


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="property-type-label">Property Type</InputLabel>
                        <Select
                            labelId="property-type-label"
                            name="property_type"
                            value={formData.property_type}
                            onChange={handleChange}
                            label="Property Type"
                            required
                        >
                            <MenuItem value=""><em>Select Type</em></MenuItem>
                            <MenuItem value="an Irrigated Agricultural Land">an Irrigated Agricultural Land</MenuItem>
                            <MenuItem value="Non-Irrigated Agricultural Land">Non-Irrigated Agricultural Land</MenuItem>
                            <MenuItem value="Industrial Shed">Industrial Shed</MenuItem>
                            <MenuItem value="Farm House">Farm House</MenuItem>
                            <MenuItem value="An Open Plot">An Open Plot</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="document-inspected-label">Document Inspected</InputLabel>
                        <Select
                            labelId="document-inspected-label"
                            name="document_inspected"
                            value={formData.document_inspected}
                            onChange={handleChange}
                            label="Document Inspected"
                            required

                        >
                            <MenuItem value=""><em>Select Document</em></MenuItem>
                            <MenuItem value="7/12 Extract Certificate">7/12 Extract Certificate</MenuItem>
                            <MenuItem value="Property Card">Property Card</MenuItem>
                            <MenuItem value="Purcahse Deed">Purcahse Deed</MenuItem>
                            <MenuItem value="GNN 8A Utara">GNN 8A Utara</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Section: Classification & Other Info */}
                <div className="section">


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="classification-label">Classification of Locality</InputLabel>
                        <Select
                            labelId="classification-label"
                            name="classification"
                            value={formData.classification}
                            onChange={handleChange}
                            label="Classification of Locality"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Mixed Area">Mixed Area</MenuItem>
                            <MenuItem value="Agricultural Area">Agricultural Area</MenuItem>
                            <MenuItem value="Industrial Area">Industrial Area</MenuItem>
                            <MenuItem value="Residential Area">Residential Area</MenuItem>
                            <MenuItem value="Commercial Area">Commercial Area</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="development-area-label">Development of Surrounding Area</InputLabel>
                        <Select
                            labelId="development-area-label"
                            name="development_area"
                            value={formData.development_area}
                            onChange={handleChange}
                            label="Development of Surrounding Area"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Ongoing">Ongoing</MenuItem>
                            <MenuItem value="Partly Developed">Partly Developed</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="flood-possibility-label">Flood Possibility</InputLabel>
                        <Select
                            labelId="flood-possibility-label"
                            name="flood_possibility"
                            value={formData.flood_possibility}
                            onChange={handleChange}
                            label="Flood Possibility"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Affected in 2005">Affected in 2005</MenuItem>
                            <MenuItem value="Affected in 2019">Affected in 2019</MenuItem>
                            <MenuItem value="Not Affected yet">Not Affected yet</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="civic-amenities-label">Civic Amenities</InputLabel>
                        <Select
                            labelId="civic-amenities-label"
                            name="civic_amenities"
                            value={formData.civic_amenities}
                            onChange={handleChange}
                            label="Civic Amenities"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Within 5-10 km radius">Within 5-10 km radius</MenuItem>
                            <MenuItem value="Within walkable distance">Within walkable distance</MenuItem>
                            <MenuItem value="So near">So near</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="communication-label">Communication</InputLabel>
                        <Select
                            labelId="communication-label"
                            name="communication"
                            value={formData.communication}
                            onChange={handleChange}
                            label="Communication"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Bus,Train,2,3,4 Wheelers private vehicles">Bus,Train,2,3,4 Wheelers private vehicles</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl fullWidth margin="normal">
                        <InputLabel id="present-use-label">Present Use of Property</InputLabel>
                        <Select
                            labelId="present-use-label"
                            name="present_use"
                            value={formData.present_use}
                            onChange={handleChange}
                            label="Present Use of Property"
                            required
                        >
                            <MenuItem value=""><em>-- Select Use --</em></MenuItem>
                            <MenuItem value="Residential">Residential purpose</MenuItem>
                            <MenuItem value="commercial">Commercial purpose</MenuItem>
                            <MenuItem value="Residential come commercial">Residential come commercial</MenuItem>
                            <MenuItem value="industrial purpose">Industrial</MenuItem>
                            <MenuItem value="farmhouse">Farmhouse</MenuItem>
                            <MenuItem value="An agricultural production">Agricultural production</MenuItem>
                            <MenuItem value="Cattle Shed">Cattle Shed</MenuItem>
                            <MenuItem value="Bedana Rack">Bedana Rack</MenuItem>
                            <MenuItem value="Green house">Green House</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="water-label">Water</InputLabel>
                        <Select
                            labelId="water-label"
                            name="water"
                            value={formData.water}
                            onChange={handleChange}
                            label="Water"
                            required
                        >
                            <MenuItem value=""><em>-- Select Water Source --</em></MenuItem>
                            <MenuItem value="By Municipal Supply">By Municipal Supply</MenuItem>
                            <MenuItem value="On Independent Open Well">On Independent Open Well</MenuItem>
                            <MenuItem value="On Common Open Well">On Common Open Well</MenuItem>
                            <MenuItem value="On Independent & Common Open Well">On Independent & Common Open Well</MenuItem>
                            <MenuItem value="On Borewell">On Borewell</MenuItem>
                            <MenuItem value="On Independent Borewell">On Independent Borewell</MenuItem>
                            <MenuItem value="On Independent Borewell & Open Well">On Independent Borewell & Open Well</MenuItem>
                            <MenuItem value="From Canal Water">From Canal Water</MenuItem>
                            <MenuItem value="By Independent Irrigation Scheme">By Independent Irrigation Scheme</MenuItem>
                            <MenuItem value="By Co-operative Irrigation Scheme">By Co-operative Irrigation Scheme</MenuItem>
                            <MenuItem value="Borrowed from Neighbour">Borrowed from Neighbour</MenuItem>
                            <MenuItem value="At Sheth Tale">At Sheth Tale</MenuItem>
                        </Select>
                    </FormControl>

                </div>




                {/* Section 3: Land Dimensions */}
                <div className="section">
                    <h3>Land Dimensions</h3>

                    <TextField
                        label="Area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="shape-label">Shape</InputLabel>
                        <Select
                            labelId="shape-label"
                            name="shape"
                            value={formData.shape}
                            onChange={handleChange}
                            label="Shape"
                            required
                        >
                            <MenuItem value=""><em>Select Shape</em></MenuItem>
                            <MenuItem value="rectangular">Rectangular</MenuItem>
                            <MenuItem value="square">Square</MenuItem>
                            <MenuItem value="triangular">Triangular</MenuItem>
                            <MenuItem value="Trapezoid">Trapezoid</MenuItem>
                            <MenuItem value="Rhombus">Rhombus</MenuItem>
                            <MenuItem value="Parallelogram">Parallelogram</MenuItem>
                            <MenuItem value="irregular">Irregular</MenuItem>
                            <MenuItem value="Odd Shaped">Odd Shaped</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demarcation-label">Demarcation</InputLabel>
                        <Select
                            labelId="demarcation-label"
                            name="demarcation"
                            value={formData.demarcation}
                            onChange={handleChange}
                            label="Demarcation"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>

                    {/* <FormControl fullWidth margin="normal">
            <InputLabel id="tenure-label">Tenure</InputLabel>
            <Select
              labelId="tenure-label"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              label="Tenure"

            >
              <MenuItem value=""><em>--</em></MenuItem>
            </Select>
          </FormControl> */}

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="frontage-road-label">Frontage Road Width</InputLabel>
                        <Select
                            labelId="frontage-road-label"
                            name="frontage_road"
                            value={formData.frontage_road}
                            onChange={handleChange}
                            label="Frontage Road Width"
                            required
                        >
                            <MenuItem value=""><em>Select Width</em></MenuItem>
                            <MenuItem value="3 m wide Road">3 m</MenuItem>
                            <MenuItem value="6 m wide Road">6 m</MenuItem>
                            <MenuItem value="9 m wide Road">9 m</MenuItem>
                            <MenuItem value="12 m wide Road">12 m</MenuItem>
                            <MenuItem value="15 m wide Road">15 m</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="plot-surface-label">Plot Surface</InputLabel>
                        <Select
                            labelId="plot-surface-label"
                            name="plot_surface"
                            value={formData.plot_surface}
                            onChange={handleChange}
                            label="Plot Surface"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Level">Level</MenuItem>
                            <MenuItem value="Partly Unlevel">Partly Unlevel</MenuItem>
                            <MenuItem value="Hilly Area">Hilly Area</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="surface-type-label">Type of soil</InputLabel>
                        <Select
                            labelId="surface-type-label"
                            name="surface_type"
                            value={formData.surface_type}
                            onChange={handleChange}
                            label="Type of soil"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Black cotton Soil">Black cotton Soil</MenuItem>
                            <MenuItem value="Red soft soil">Red soft soil</MenuItem>
                            <MenuItem value="Partly black cotton & Red soil">Partly black cotton & Red soil</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="na-status-label">N.A. / Non N.A.</InputLabel>
                        <Select
                            labelId="na-status-label"
                            name="na_status"
                            value={formData.na_status}
                            onChange={handleChange}
                            label="N.A. / Non N.A."
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Agricultural Land">Agricultural Land</MenuItem>
                            <MenuItem value="Non-Agricultural Land">Non-Agricultural Land</MenuItem>
                            <MenuItem value="T.P NA">T.P NA</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="title-label">Title</InputLabel>
                        <Select
                            labelId="title-label"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            label="Title"
                            required
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value="Free hold">Free hold</MenuItem>
                            <MenuItem value="Lease hold">Lease hold</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="direction-label">Direction</InputLabel>
                        <Select
                            labelId="direction-label"
                            name="direction"
                            value={formData.direction}
                            onChange={handleChange}
                            label="Direction"
                            required
                        >
                            <MenuItem value=""><em>Select Direction</em></MenuItem>
                            <MenuItem value="Facing towards East">Facing towards East</MenuItem>
                            <MenuItem value="Facing towards West">Facing towards West</MenuItem>
                            <MenuItem value="Facing towards North">Facing towards North</MenuItem>
                            <MenuItem value="Facing towards South">Facing towards South</MenuItem>
                            <MenuItem value="Facing towards East-North">Facing towards East-North</MenuItem>
                            <MenuItem value="Facing towards East-South">Facing towards East-South</MenuItem>
                            <MenuItem value="Facing towards North-East">Facing towards North-East</MenuItem>
                            <MenuItem value="Facing towards North-West">Facing towards North-West</MenuItem>
                            <MenuItem value="Facing towards West-North">Facing towards West-North</MenuItem>
                            <MenuItem value="Facing towards West-South">Facing towards West-South</MenuItem>
                            <MenuItem value="Facing towards South-West">Facing towards South-West</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Grampanchayat / Municipal"
                        name="grampanchayat"
                        value={formData.grampanchayat}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    {/* Assuming guts is an array of objects */}
                    <Box>
                        <div className='section'>
                            {formData.guts.map((gut, index) => {
                                const gutNoKey = Object.keys(gut).find((k) => k.startsWith("gut_no"));

                                return (
                                    <div key={index} style={{ border: "1px solid #ccc", margin: "10px 0", padding: 10, borderRadius: 5 }}>
                                        <h4>Gut {index + 1}</h4>

                                        <TextField
                                            label="G.NO"
                                            value={gut[gutNoKey] || ""}
                                            onChange={(e) => handleGutChange(index, gutNoKey, e.target.value)}
                                            fullWidth
                                            margin="normal"

                                        />

                                        <TextField
                                            label="East"
                                            value={gut.east || ""}
                                            onChange={(e) => handleGutChange(index, "east", e.target.value)}
                                            fullWidth
                                            margin="normal"

                                        />

                                        <TextField
                                            label="West"
                                            value={gut.west || ""}
                                            onChange={(e) => handleGutChange(index, "west", e.target.value)}
                                            fullWidth
                                            margin="normal"
                                        />

                                        <TextField
                                            label="South"
                                            value={gut.south || ""}
                                            onChange={(e) => handleGutChange(index, "south", e.target.value)}
                                            fullWidth
                                            margin="normal"
                                        />

                                        <TextField
                                            label="North"
                                            value={gut.north || ""}
                                            onChange={(e) => handleGutChange(index, "north", e.target.value)}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Box>
                </div>


                <div className='section' >

                    {/* <Paper sx={{
          p: 2, mb: 4,
          width: "100%",
          maxWidth: "1200px",
        }}> */}
                    <Typography variant="h6">Valuation Section</Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Fair Market Value (FMV)"
                        name="fmv"
                        value={formData.fmv ? Number(formData.fmv).toLocaleString("en-IN") : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Valuation in Words"
                        name="valuation_words"
                        value={formData.valuation_words}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Realizable Value (95% FMV)"
                        name="realizable_value"
                        value={formData.realizable_value}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Distress Value (70% FMV)"
                        name="distress_value"
                        value={formData.distress_value}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Government Valuation"
                        name="government_valuation"
                        value={formData.government_valuation || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter government valuation"
                    />

                    <TextField
                        select
                        label="Year Range"
                        name="year_range"
                        value={formData.year_range}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="">Select Year Range</MenuItem>
                        <MenuItem value="2025-2026">2025-2026</MenuItem>
                        <MenuItem value="2026-2027">2026-2027</MenuItem>
                        <MenuItem value="2027-2028">2027-2028</MenuItem>
                        <MenuItem value="2028-2029">2028-2029</MenuItem>
                        <MenuItem value="2029-2030">2029-2030</MenuItem>
                        <MenuItem value="2030-2031">2030-2031</MenuItem>
                        <MenuItem value="2031-2032">2031-2032</MenuItem>
                        <MenuItem value="2032-2033">2032-2033</MenuItem>
                        <MenuItem value="2033-2034">2033-2034</MenuItem>
                        <MenuItem value="2034-2035">2034-2035</MenuItem>

                    </TextField>

                    <TextField
                        select
                        label="Select Crop"
                        name="crop"
                        value={formData.crop}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="">Select Crop</MenuItem>
                        <MenuItem value="Turmeric">Turmeric</MenuItem>
                        <MenuItem value="Sugarcane">Sugarcane</MenuItem>
                        <MenuItem value="Grapes">Grapes</MenuItem>
                        <MenuItem value="Soyabean">Soyabean</MenuItem>
                        <MenuItem value="Sugarcane & Grapes">Sugarcane & Grapes</MenuItem>
                        <MenuItem value="Sugarcane & Soyabean">Sugarcane & Soyabean</MenuItem>
                        <MenuItem value="Sugarcane & Turmeric">Sugarcane & Turmeric</MenuItem>
                        <MenuItem value="Sugarcane & Vegetables">Sugarcane & Vegetables</MenuItem>
                        <MenuItem value="Sugarcane & Fruits">Sugarcane & Fruits</MenuItem>
                        <MenuItem value="Turmeric & Sugarcane">Turmeric & Sugarcane</MenuItem>
                        <MenuItem value="Turmeric & Grapes">Turmeric & Grapes</MenuItem>
                        <MenuItem value="Turmeric & Fruits">Turmeric & Fruits</MenuItem>
                        <MenuItem value="Turmeric & Vegetables">Turmeric & Vegetables</MenuItem>
                        <MenuItem value="Fruits">Fruits</MenuItem>
                        <MenuItem value="Vegetables">Vegetables</MenuItem>
                        <MenuItem value="Fruits & Vegetables">Fruits & Vegetables</MenuItem>
                        <MenuItem value="Jawar">Jawar</MenuItem>
                        <MenuItem value="Wheat">Wheat</MenuItem>
                        <MenuItem value="Wheat & Jawar">Wheat & Jawar</MenuItem>
                        <MenuItem value="Rice">Rice</MenuItem>
                        <MenuItem value="Cotton">Cotton</MenuItem>
                        <MenuItem value="Maize">Maize</MenuItem>
                        <MenuItem value="Pulses">Pulses</MenuItem>

                    </TextField>

                    {/* </Paper> */}
                </div>


                <Box
                    sx={{
                        position: "-moz-initial",
                        bottom: 20,
                        right: 20, // or "center" with left/right 0 + textAlign
                        zIndex: 9999,
                    }}
                >

                    <Button type="Submit" variant="contained" >
                        Generate PDF
                    </Button>
                </Box>



            </form>

            {/* Hidden / off-screen container for PDF generation */}
            <div style={{ position: "absolute", top: -9999, left: -9999 }}>
                <div>
                    <Report ref={reportRef} formData={formData} />
                </div>
            </div>
        </Box >
    );
};

export default Agriculture;
