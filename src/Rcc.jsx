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
    Chip
} from "@mui/material";

import html2pdf from "html2pdf.js";
import Report2 from './Report2';



const Rcc = () => {

    const [formData, setFormData] = useState({
        // PAGE 1 & 2
        owner_name: "",
        address: "",
        roles: "",
        bank_name: "",
        date_of_visit: "",
        // PAGE 3: General Information
        purpose_of_valuation: "",
        documents_inspected: "",
        rs_no_hissa_no: "",
        plot_no: "",
        location: "",
        grampanchayat: "",
        property_type: "",
        classification: "",
        development_area: "",
        flood_possibility: "",
        civic_amenities: "",
        communication: "",
        present_use: "",
        electricity: "",
        drinking_water: "",
        // PAGE 4: Land Details
        area: "",
        shape: "",
        demarcation: "",
        tenure: "",
        frontage_road: "",
        plot_surface: "",
        surface_type: "",
        na_status: "",
        title: "",
        direction: "",
        // PAGE 5: Specifications
        foundation: "",
        super_structure: "",
        plaster: "",
        windows: "",
        door: "",
        flooring: "",
        roof: "",
        stair_case: "",
        sanitary_ware: "",
        electrification: "",
        provision_drinking_water: "",
        coloring: "",
        kitchen: "",
        wc_bath: "",
        compound_wall: "",
        ms_gate: "",
        collapsible_shutter: "",
        ms_safety_door: "",
        main_door: "",
        glazed_tile_dado: "",
        built_up_area: "",
        // PAGE 6: Boundaries
        east: "",
        west: "",
        south: "",
        north: "",
        // PAGE 7: Valuation
        fmv: "",
        realizable_value: "",
        distress_value: "",
        government_valuation: "",
        year_range: "",
        // PAGE 8: Declaration
        valuer_signature: "",


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

    const report2Ref = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // List of fields that are OPTIONAL (all others will be treated as required)
        const optionalFields = ["east", "west", "south", "north","Bank_name"];

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
        const element = report2Ref.current;
        if (!element) {
            console.error("report2Ref is null");
            return;
        }

        const opt = {
            margin: 10,
            filename: `Rcc_load_valuation_${formData.owner_name || "report"}.pdf`,
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
        <Box
            sx={{
                bgcolor: "#71a5abff",
                minHeight: "100vh",
                px: { xs: 1, sm: 4, md: 10, lg: 40 }, // Responsive horizontal padding
                py: { xs: 1, sm: 2, md: 4 },          // Responsive vertical padding
            }}
        >


            <Typography variant="h4" gutterBottom sx={{ color: "#340ef6ff", fontWeight: "bold", textAlign: "center", position: 'static', }}>
                Valuation report Form D.V. Shinde
            </Typography>

            <div className='report-container'>
                <form onSubmit={handleSubmit}>

                    <div className="section">
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="roles-label">Select Roles</InputLabel>
                            <Select
                                labelId="roles-label"
                                multiple
                                name="roles"
                                // Split the string back into an array for display
                                value={formData.roles ? formData.roles.split(" & ") : []}
                                onChange={(e) => {
                                    const selectedValues = e.target.value;
                                    // Join selected values into a single string with " & "
                                    setFormData({
                                        ...formData,
                                        roles: selectedValues.join(" & "),
                                    });
                                }}
                                label="Select Roles"
                                renderValue={(selected) => (
                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="OWNER">OWNER</MenuItem>
                                <MenuItem value="BORROWER">BORROWER</MenuItem>
                                <MenuItem value="OWNER & BORROWER">OWNER & BORROWER</MenuItem>
                                <MenuItem value="CO-BORROWER">CO-BORROWER</MenuItem>
                                <MenuItem value="OWNER & CO-BORROWER">OWNER & CO-BORROWER</MenuItem>
                            </Select>
                        </FormControl>


                        <TextField
                            fullWidth
                            margin="normal"
                            label="Owner Name"
                            name="owner_name"
                            value={formData.owner_name}
                            onChange={handleChange}
                            required
                        />
                        <div>
                            {/* Select types (G.NO., M.NO., C.S.NO.) */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="gut-no-label">Select Gut Numbers</InputLabel>
                                <Select
                                    labelId="gut-no-label"
                                    multiple
                                    name="gut_type"
                                    // Safely convert string → array
                                    value={
                                        formData.gut_type
                                            ? Array.isArray(formData.gut_type)
                                                ? formData.gut_type
                                                : formData.gut_type.split(",").map((v) => v.trim())
                                            : []
                                    }
                                    onChange={(e) => {
                                        const selectedValues = e.target.value;
                                        // Convert array → comma-separated string
                                        setFormData({
                                            ...formData,
                                            gut_type: selectedValues.join(", "),
                                        });
                                    }}
                                    label="Select Gut Numbers"
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    <MenuItem value="G.NO.">G.NO.</MenuItem>
                                    <MenuItem value="M.NO.">M.NO.</MenuItem>
                                    <MenuItem value="C.S.NO.">C.S.NO.</MenuItem>
                                </Select>
                            </FormControl>


                            <TextField
                                fullWidth
                                margin="normal"
                                label="Enter Gut Numbers (G.NO., M.NO., C.S.NO.)"
                                name="gut_no"
                                value={formData.gut_no} // Display the entered numbers
                                onChange={handleChange} // Update the value as user types
                                required
                            />
                        </div>

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
                                // required
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
                                <MenuItem value="Laxmi Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus">Laxmi Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,main branch Palus</MenuItem>
                                <MenuItem value="Laxmi Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch main road Palus">Laxmi Gramin Bigar Sheti Sahakari Patsanstha Maryadit Palus,branch main road Palus</MenuItem>
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
                                <MenuItem value="Shree Datta nagari Sahakari PatSanstha Maryadit, Urun-Islampur,branch Urun-Islampur ">Shree Datta nagari Sahakari PatSanstha Maryadit, Urun-Islampur,branch Urun-Islampur</MenuItem>
                                <MenuItem value="Shree Datta nagari Sahakari PatSanstha Maryadit, Urun-Islampur,branch Audumbar ">Shree Datta nagari Sahakari PatSanstha Maryadit, Urun-Islampur,branch Audumbar</MenuItem>
                                <MenuItem value="Shree Datta nagari Sahakari PatSanstha Maryadit, Urun-Islampur,branch Shirala ">Shree Datta nagari Sahakari PatSanstha Maryadit, Urun-Islampur,branch Shirala</MenuItem>
                                

                            </Select>
                      
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Bank name"
                                    name="bank_name_custom"
                                    value={formData.bank_name_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom document type"
                                />
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
                                <MenuItem value="Industrial Shed">Industrial Shed</MenuItem>
                                <MenuItem value="Farm House">Farm House</MenuItem>
                                <MenuItem value="Godown Building">Godown Building</MenuItem>
                                <MenuItem value="Storage Shed">Storage Shed</MenuItem>
                                <MenuItem value="Cattle Shed">Cattle Shed</MenuItem>
                                <MenuItem value="Cold Storage">Cold Storage </MenuItem>



                            </Select>
                        </FormControl>


                        <FormControl fullWidth margin="normal">
                            <InputLabel id="document-inspected-label">Document Inspected</InputLabel>
                            <Select
                                labelId="document-inspected-label"
                                name="documents_inspected"
                                value={formData.documents_inspected}
                                onChange={handleChange}
                                label="Document Inspected"
                                required

                            >
                                <MenuItem value=""><em>Select Document</em></MenuItem>
                                <MenuItem value="7/12 Extract Certificate">7/12 Extract Certificate</MenuItem>
                                <MenuItem value="Property Card">Property Card</MenuItem>
                                <MenuItem value="Purcahse Deed">Purcahse Deed</MenuItem>
                                <MenuItem value="Grampanchayat GNN 8A Utara">Grampanchayat GNN 8A Utara</MenuItem>
                                <MenuItem value="Both Property Card Grampanchayat GNN 8A Utara">Both Property Card Grampanchayat GNN 8A Utara</MenuItem>
                                <MenuItem value="Search report">Search report</MenuItem>

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
                                <MenuItem value="Both Residential-cum-Commercial Area">Both Residential-cum-Commercial Area</MenuItem>
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
                                <MenuItem value="Ongoing development">Ongoing development</MenuItem>
                                <MenuItem value="Partly Developed">Partly Developed</MenuItem>
                                <MenuItem value="Fully Developed">Fully Developed</MenuItem>

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
                                <MenuItem value="Within 2-5 km radius">Within 2-5 km radius</MenuItem>
                                <MenuItem value="Within 5-10 km radius">Within 5-10 km radius</MenuItem>
                                <MenuItem value="Within 15-20 km radius">Within 15-20 km radius</MenuItem>
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
                                <MenuItem value="Residential-cum-commercial">Residential-cum-commercial</MenuItem>
                                <MenuItem value="industrial purpose">Industrial purpose</MenuItem>
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
                                <MenuItem value="Both Municipal Supply & Borewell">Both Municipal Supply & Borewell</MenuItem>
                                <MenuItem value="Grampanchayat water supply">Grampanchayat water supply</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="electricity-availability-label">Electricity Availability</InputLabel>
                            <Select
                                labelId="electricity-availability-label"
                                name="electricity"
                                value={formData.electricity}
                                onChange={handleChange}
                                label="Electricity Availability"
                            >
                                <MenuItem value=""><em>-- Select Availability --</em></MenuItem>
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Not Available">Not Available</MenuItem>
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
                                <MenuItem value="Yes demarked">Yes demarked</MenuItem>
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
                                <MenuItem value="25 m wide Road">25 m</MenuItem>
                                <MenuItem value="30 m wide Road">30 m</MenuItem>
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
                                <MenuItem value="Shadow soil">Shadow soil</MenuItem>
                                <MenuItem value="Hard Murum">Hard Murum</MenuItem>
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
                                <MenuItem value="Town Planning NA Land">Town Planning NA Land</MenuItem>
                                <MenuItem value="Tehsildar NA Land">Tehsildar NA Land</MenuItem>
                                <MenuItem value="Gavthanabaheril NA">Gavthanabaheril NA</MenuItem>
                                <MenuItem value="Gavthan">Gavthan</MenuItem>
                                <MenuItem value="Commercial NA">Commercial NA</MenuItem>
                                <MenuItem value="Industrial NA">Industrial NA</MenuItem>

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

                        <div>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="foundation-label">Foundation</InputLabel>
                                <Select
                                    labelId="foundation-label"
                                    multiple
                                    name="foundation"
                                    value={formData.foundation ? formData.foundation.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue =
                                            typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "foundation",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Foundation"
                                >
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="RCC Footing Foundation(1:2:4)">RCC Footing Foundation(1:2:4)</MenuItem>
                                    <MenuItem value="Stone Masonry">Stone Masonry</MenuItem>
                                    <MenuItem value="Both U.C.R & RCC Footing Foundation(1:6) & (1:2:4)">Both U.C.R & RCC Footing Foundation(1:6) & (1:2:4)</MenuItem>
                                    <MenuItem value="U.C.R Masonry Foundation in C.M (1:6)">U.C.R Masonry Foundation in C.M (1:6)</MenuItem>
                                    <MenuItem value="U.C.R Masonry Foundation in C.M (1:6)">U.C.R Masonry Foundation in C.M (1:6)</MenuItem>
                                    <MenuItem value="Pile Foundation">Pile Foundation</MenuItem>
                                    <MenuItem value="M.S.Stanchion Foundation">M.S.Stanchion Foundation</MenuItem>



                                </Select>
                                {(
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Specify Foundation Type"
                                        name="foundation_custom"
                                        value={formData.foundation_custom || ""}
                                        onChange={handleChange}
                                        placeholder="Enter custom foundation type"
                                    />
                                )}
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="super_structure">super structure</InputLabel>
                                <Select
                                    labelId="foundation-label"
                                    multiple
                                    name="super_structure"
                                    value={formData.super_structure ? formData.super_structure.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue =
                                            typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "super_structure",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="super structure"
                                >
                                    <MenuItem value={'1\' 6" U.C.R Masonry in C.M (1:6) '}>1' 6" U.C.R Masonry in C.M (1:6) </MenuItem>
                                    <MenuItem value={'Both 9" 4" thick B.B Masonry in C.M (1:6) & in C.M (1:4)'}>Both 9" 4" thick B.B Masonry in C.M (1:6) & in C.M (1:4)</MenuItem>
                                    <MenuItem value={'6" thick B.B Masonry in C.M (1:5) '}>6" thick B.B Masonry in C.M (1:5)</MenuItem>
                                    <MenuItem value={'9" thick Cement concrete block in C.M (1:5)'}>9" thick Cement concrete block in C.M (1:5)</MenuItem>
                                    <MenuItem value={'6" thick Rcc Wall'}>6" thick Rcc Wall</MenuItem>
                                    <MenuItem value="AAC block Masonry in  C.M (1:6)">AAC block Masonry in  C.M (1:6)</MenuItem>
                                    <MenuItem value="Chira stone Masonry">Chira stone Masonry</MenuItem>


                                </Select>

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Super Structure Type"
                                    name="super_structure_custom"
                                    value={formData.super_structure_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom super structure"
                                />

                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="plaster-label">Plaster</InputLabel>
                                <Select
                                    labelId="plaster-label"
                                    multiple
                                    name="plaster"
                                    value={formData.plaster ? formData.plaster.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "plaster",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Plaster"
                                >

                                    <MenuItem value="Internal & External sand faced in C.M (1:6) & (1:4)">Internal & External sand faced in C.M (1:6) & (1:4)</MenuItem>
                                    <MenuItem value="Internal neeru finished and external sand faced cement plaster">Internal neeru finished and external sand faced cement plaster</MenuItem>
                                    <MenuItem value="Internal wall putty finished plaster">Internal wall putty finished plaster</MenuItem>
                                    <MenuItem value="Internal sand faced & external cement pointing ">Internal sand faced & external cement pointing</MenuItem>
                                    <MenuItem value="Textured External plaster">Textured External plaster</MenuItem>

                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Plaster Type"
                                    name="plaster_custom"
                                    value={formData.plaster_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom plaster type"
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="windows">Windows</InputLabel>
                                <Select
                                    labelId="Windows"
                                    multiple
                                    name="windows"
                                    value={formData.windows ? formData.windows.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "windows",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Windows"
                                >

                                    <MenuItem value="M.S.Grilled Glass paneled Aluminium sliding window">M.S.Grilled Glass paneled Aluminium sliding window </MenuItem>
                                    <MenuItem value="M.S.Grilled Glass paneled Aluminium powder coated window">M.S.Grilled Glass paneled Aluminium powder coated window</MenuItem>
                                    <MenuItem value="Teakwood framed Glass paneled  window">Teakwood framed Glass paneled  window</MenuItem>
                                    <MenuItem value="Non-Teakhood framed Glass paneled  window">Non-Teakwood framed Glass paneled  window</MenuItem>
                                    <MenuItem value="UPVC framed Glass paneled window">UPVC framed Glass paneled window</MenuItem>
                                    <MenuItem value="Cement concrete framed bison paneled shutter window">Cement concrete framed bison paneled shutter window</MenuItem>

                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Window Type"
                                    name="windows_custom"
                                    value={formData.windows_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom window type"
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="door">Door</InputLabel>
                                <Select
                                    labelId="door"
                                    multiple
                                    name="door"
                                    value={formData.door ? formData.door.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "door",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Plaster"
                                >

                                    <MenuItem value="Main door Teakwood framed paneled door & Internal doors in granite framed flush doors">Main door Teakwood framed paneled door & Internal doors in granite framed flush doors</MenuItem>
                                    <MenuItem value="Cement concrete framed flush door">Cement concrete framed flush door</MenuItem>
                                    <MenuItem value="Cement concrete framed bison paneled door">Cement concrete framed bison paneled door</MenuItem>
                                    <MenuItem value=" W.C Bath PVC doors">W.C Bath PVC doors</MenuItem>
                                    <MenuItem value="M.S safety front door">M.S safety front door</MenuItem>
                                    <MenuItem value="M.S safety rear door">M.S safety rear door</MenuItem>
                                    <MenuItem value="M.S safety doors front & rear">M.S safety doors front & rear</MenuItem>

                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Door Type"
                                    name="door_custom"
                                    value={formData.door_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom door type"
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="flooring-label">Flooring</InputLabel>
                                <Select
                                    labelId="flooring"
                                    multiple
                                    name="flooring "
                                    value={formData.flooring ? formData.flooring.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "flooring",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Flooring"
                                >
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Vitrified Tiles">Vitrified Tiles</MenuItem>
                                    <MenuItem value="Ceramic Tiles">Ceramic Tiles</MenuItem>
                                    <MenuItem value="M.M tile">M.M tile</MenuItem>
                                    <MenuItem value="Marble">Marble</MenuItem>
                                    <MenuItem value="Marbonite">Marbonite</MenuItem>
                                    <MenuItem value="Granite">Granite</MenuItem>
                                    <MenuItem value="I.P.S flooring">I.P.S flooring</MenuItem>
                                    <MenuItem value="kotah Stone flooring">kotah Stone flooring</MenuItem>
                                    <MenuItem value="Tandoor Stone flooring">Tandoor Stone flooring</MenuItem>
                                    <MenuItem value="Rough Shahabad Stone flooring">Rough Shahabad Stone flooring</MenuItem>
                                    <MenuItem value="Wooden flooring">Wooden flooring</MenuItem>


                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Flooring Type"
                                    name="flooring_custom"
                                    value={formData.flooring_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom flooring type"
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="roof-label">Roof</InputLabel>
                                <Select
                                    labelId="roof"
                                    multiple
                                    name="roof"
                                    value={formData.roof ? formData.roof.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "roof",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Roof"
                                >
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="RCC Slab">RCC Slab</MenuItem>
                                    <MenuItem value="G.I Sheet">GI Sheet</MenuItem>
                                    <MenuItem value="A.C Sheet">A.C Sheet</MenuItem>
                                    <MenuItem value="Manglore tile">Manglore tile</MenuItem>
                                    <MenuItem value="Wooden fall ceiling">Wooden fall ceiling</MenuItem>
                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Roof Type"
                                    name="roof_custom"
                                    value={formData.roof_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom roof type"
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="stair_case-label">Stair Case</InputLabel>
                                <Select
                                    labelId="stair_case-label"
                                    multiple
                                    name="stair_case"
                                    value={formData.stair_case ? formData.stair_case.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "stair_case",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Stair Case"
                                >
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="RCC Dog leged">RCC Dog leged</MenuItem>
                                    <MenuItem value="RCC straight flight">RCC straight flight</MenuItem>
                                    <MenuItem value="RCC curved">RCC curved</MenuItem>
                                    <MenuItem value="Spiral">Spiral</MenuItem>
                                    <MenuItem value="Qurter turned">Qurter turned</MenuItem>
                                    <MenuItem value="Bifurcated">Bifurcated</MenuItem>
                                    <MenuItem value="Bifurcated">Bifurcated</MenuItem>
                                    <MenuItem value="Fabricated">Fabricated</MenuItem>

                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Stair Case Type"
                                    name="stair_case_custom"
                                    value={formData.stair_case_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom stair case type"
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Sanitary Ware</InputLabel>
                                <Select name="sanitary_ware" value={formData.sanitary_ware} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Second quality">Second quality</MenuItem>
                                    <MenuItem value="Standard quality">Standard quality</MenuItem>
                                    <MenuItem value="Both Standard & Second quality">Both Standard & Second quality</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Electrification</InputLabel>
                                <Select name="electrification" value={formData.electrification} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Concealed wiring">Concealed wiring</MenuItem>
                                    <MenuItem value="Casing caping Wiring">Casing caping Wiring</MenuItem>
                                    <MenuItem value="Both Casing caping & Concealed Wiring">Both Casing caping & Concealed Wiring</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Provision of Drinking Water</InputLabel>
                                <Select name="drinking_water" value={formData.drinking_water} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="coloring">Coloring</InputLabel>
                                <Select
                                    labelId="coloring"
                                    multiple
                                    name="coloring"
                                    value={formData.coloring ? formData.coloring.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "coloring",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Coloring"
                                >
                                    <MenuItem value="Building is painted on either side ">Building is painted on either side</MenuItem>
                                    <MenuItem value="Building is not painted ">Building is not painted</MenuItem>
                                    <MenuItem value="Building is painted on either side with oil painted doors and frames by Asian paint">Building is painted on either side with oil painted doors and frames by Asian paint</MenuItem>
                                    <MenuItem value="Building is painted on either side with oil painted doors and frames by Luster paint">Building is painted on either side with oil painted doors and frames by Luster paint</MenuItem>
                                    <MenuItem value="Internal Only">Internal Only</MenuItem>
                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Coloring Type"
                                    name="coloring_custom"
                                    value={formData.coloring_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom coloring type"
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="kitchen-label">Kitchen</InputLabel>
                                <Select
                                    labelId="kitchen-label"
                                    multiple
                                    name="kitchen"
                                    value={formData.kitchen ? formData.kitchen.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "kitchen",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Kitchen"
                                >
                                    <MenuItem value="Kaddappa kitchen oota">Kaddappa kitchen oota</MenuItem>
                                    <MenuItem value="Modular Kitchen  oota">Modular Kitchen oota</MenuItem>
                                    <MenuItem value="Granite Kitchen oota">Granite Kitchen oota</MenuItem>
                                    <MenuItem value="Marble Kitchen oota">Marble Kitchen oota</MenuItem>



                                </Select>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Kitchen Type"
                                    name="kitchen_custom"
                                    value={formData.kitchen_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom kitchen type"
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>WC Bath</InputLabel>
                                <Select name="wc_bath" value={formData.wc_bath} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="European Attached wc bath">European Attached wc bath</MenuItem>
                                    <MenuItem value="Common">Common</MenuItem>
                                    <MenuItem value="Attached">Attached</MenuItem>
                                    <MenuItem value="both Attached & Common">both Attached & Common</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="compound_wall-label">Compound Wall</InputLabel>
                                <Select
                                    labelId="compound_wall-label"
                                    multiple
                                    name="compound_wall"
                                    value={formData.compound_wall ? formData.compound_wall.split(", ") : []}
                                    onChange={(e) => {
                                        const {
                                            target: { value },
                                        } = e;
                                        const stringValue = typeof value === "string" ? value : value.join(", ");
                                        handleChange({
                                            target: {
                                                name: "compound_wall",
                                                value: stringValue,
                                            },
                                        });
                                    }}
                                    label="Compound Wall"
                                >
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                                    <MenuItem value={"Property is surrounded by 5' height 9\" thick B.B Masonry"}>Property is surrounded by 5' height 9\" thick B.B Masonry</MenuItem>
                                    <MenuItem value="Barbed wired fencing">Barbed wired fencing</MenuItem>
                                    <MenuItem value="Pre casted compound wall">Pre casted compound wall</MenuItem>
                                    <MenuItem value="U.C.R Masonry compound wall">U.C.R Masonry compound wall</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>

                                </Select>

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Specify Compound Wall Type"
                                    name="compound_wall_custom"
                                    value={formData.compound_wall_custom || ""}
                                    onChange={handleChange}
                                    placeholder="Enter custom compound wall type"
                                />

                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>MS Gate</InputLabel>
                                <Select name="ms_gate" value={formData.ms_gate} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Provided">Provided</MenuItem>
                                    <MenuItem value="Not Provided">Not Provided</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Collapsible Shutter</InputLabel>
                                <Select name="collapsible_shutter" value={formData.collapsible_shutter} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Provided">Provided</MenuItem>
                                    <MenuItem value="Not Provided">Not Provided</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>MS Safety Door</InputLabel>
                                <Select name="ms_safety_door" value={formData.ms_safety_door} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Provided">Provided</MenuItem>
                                    <MenuItem value="Not Provided">Not Provided</MenuItem>
                                </Select>
                            </FormControl>

                            {/* <FormControl fullWidth margin="normal">
  <InputLabel>Main Door</InputLabel>
  <Select name="main_door" value={formData.main_door} onChange={handleChange}>
    <MenuItem value=""><em>Select</em></MenuItem>
    <MenuItem value="Teak Wood">Teak Wood</MenuItem>
    <MenuItem value="Flush">Flush</MenuItem>
   <MenuItem value="">Flush</MenuItem>

  </Select>
</FormControl> */}

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Glazed Tile Dado (Kitchen & W.C. Bath)</InputLabel>
                                <Select name="tile_dado" value={formData.tile_dado || ""} onChange={handleChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    <MenuItem value="Full height Glazed Tile Dado">Full height Glazed Tile Dado</MenuItem>
                                    <MenuItem value="Not Provided">Not Provided</MenuItem>
                                </Select>
                            </FormControl>


                            <TextField
                                label="built_up_area"
                                name="built_up_area"
                                value={formData.built_up_area}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />

                        </div>



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
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="crop-label">Select Crop</InputLabel>
                            <Select
                                labelId="crop-label"
                                multiple
                                name="crop"
                                value={formData.crop ? formData.crop.split(", ") : []}
                                onChange={(e) => {
                                    const {
                                        target: { value },
                                    } = e;
                                    const stringValue = typeof value === "string" ? value : value.join(", ");
                                    handleChange({
                                        target: {
                                            name: "crop",
                                            value: stringValue,
                                        },
                                    });
                                }}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                <MenuItem value="Vacant">Vacant</MenuItem>
                                <MenuItem value="No crop is gowing on it">No crop is gowing on it</MenuItem>
                                <MenuItem value="Rcc Bunglow">Rcc Bunglow</MenuItem>
                                <MenuItem value="Apartment Building">Apartment Building</MenuItem>
                                <MenuItem value="Load Bearing ">Apartment Building</MenuItem>
                                <MenuItem value="Turmeric">Turmeric</MenuItem>
                                <MenuItem value="Sugarcane">Sugarcane</MenuItem>
                                <MenuItem value="Grapes">Grapes</MenuItem>
                                <MenuItem value="Soyabean">Soyabean</MenuItem>
                                <MenuItem value="Fruits">Fruits</MenuItem>
                                <MenuItem value="Vegetables">Vegetables</MenuItem>
                                <MenuItem value="Jawar">Jawar</MenuItem>
                                <MenuItem value="Wheat">Wheat</MenuItem>
                                <MenuItem value="Rice">Rice</MenuItem>
                                <MenuItem value="Cotton">Cotton</MenuItem>
                                <MenuItem value="Maize">Maize</MenuItem>
                                <MenuItem value="Pulses">Pulses</MenuItem>
                            </Select>
                        </FormControl>

                    </div>
                    {/* </Paper> */}


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
            </div>

            {/* Hidden / off-screen container for PDF generation */}
            <div style={{ position: "absolute", top: -9999, left: -9999 }}>
                <div>
                    <Report2 ref={report2Ref} formData={formData} />
                </div>
            </div>
        </Box >
    );
};

export default Rcc;
