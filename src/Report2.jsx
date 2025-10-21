import React, { forwardRef } from "react";

// import "./Report.css";


const Report2 = forwardRef(({ formData }, ref) => {
    if (!formData) return null;

    return (
        <div ref={ref}>
            {/* PAGE 1 */}
            <div className="page">

                <div className="top">
                    <h2 className="title">D.V. Shinde</h2>
                    <h4 className="demo">Consulting Engg, Govt. Regd. Contractor, Valuer & Surveyor</h4>
                    <h4 className="demo">R/O: Sawantpur Gaon, Tal: Palus, Dist: Sangli 416310</h4>
                    <h4>Regd. No. L-22756, E/644/2018</h4>
                    <h4>Mob: 9270312080</h4>
                </div>
                <br></br>
                <div className="center">

                    <h1>VALUATION REPORT</h1>

                </div>
                <div className="center-middle">
                    <h3>{formData.roles}</h3>
                    <div>
                        <p>
                            Name &amp; Address: <strong>{formData.owner_name}</strong>
                        </p>
                        <p>
                            {formData.gut_type} <strong>{formData.gut_no}</strong>
                        </p>
                        <p>
                            <strong>{formData.address}</strong>
                        </p>
                    </div>


                </div>
            </div>

            {/* PAGE 2 */}
            <div className="page">
                <div className="top">
                    <h2 className="title">D.V. Shinde</h2>
                    <h4 className="demo">Consulting Engg, Govt. Regd. Contractor, Valuer & Surveyor</h4>
                    <h4 className="demo">R/O: Sawantpur Gaon, Tal: Palus, Dist: Sangli 416310</h4>
                    <h4>Regd. No. L-22756, E/644/2018</h4>
                    <h4>Mob: 9270312080</h4>
                </div>
                <div className=".center-middle">
                    <h1 className="report-title">VALUATION REPORT</h1>
                    <div className="date">Date: {formData.date_of_visit}</div>

                    <div className="to-block">
                        To,<br />
                        Branch Manager,<br />
                          Loan Proposal With  {[formData.bank_name, formData.bank_name_custom]
                                    .filter(Boolean)
                                    .join(", ")}
                    </div>

                    <p>Respected Sir,</p>
                    <p className="indent">
                        After independent site visit to  {formData.property_type} {"  "}  {formData.gut_type}. {formData.gut_no} ,{" "}
                        <strong>{formData.address}</strong>, I have prepared the valuation of the same for <strong> {formData.owner_name}</strong>.
                    </p>

                    <p className="valuation">
                        So total fair market value of {formData.property_type} {"  "} {formData.gut_type}.
                        <strong>{formData.gut_no}</strong> = {" "}
                        <span className="amount">Rs. {formData.fmv} </span> {"  "}
                        <span className="words">(Amount in Words: {formData.valuation_words})</span>
                    </p>
                </div>
            </div>

            {/* PAGE 3: Property Information */}
            <div className="page">
                <div className="container ">
                    <h1>Property Information</h1>
                    <table className="property-table">
                        <tbody>
                            <tr>
                                <th>Purpose of valuation</th>
                                <td>Loan Proposal With  {[formData.bank_name, formData.bank_name_custom]
                                    .filter(Boolean)
                                    .join(", ")}</td>
                            </tr>
                            <tr>
                                <th>{formData.gut_type}.</th>
                                <td>{formData.gut_no}</td>
                            </tr>
                            <tr>
                                <th>R.S. No. /Hissa No.</th>
                                <td>Not applicable </td>
                            </tr>
                            <tr>
                                <th>Type of Property</th>
                                <td>{formData.property_type}</td>
                            </tr>
                            <tr>
                                <th>Classification of Locality</th>
                                <td>{formData.classification}</td>
                            </tr>
                            <tr>
                                <th>Development of Surrounding Area</th>
                                <td>{formData.development_area}</td>
                            </tr>
                            <tr>
                                <th>Possibility of frequent flooding</th>
                                <td>{formData.flood_possibility}</td>
                            </tr>
                            <tr>
                                <th>Feasibility of Civic Amenities</th>
                                <td>{formData.civic_amenities}</td>
                            </tr>
                            <tr>
                                <th>Means proximity to surface communication by which the locality is served</th>
                                <td>{formData.communication}</td>
                            </tr>
                            <tr>
                                <th>Present Use of property</th>
                                <td>{formData.present_use}</td>
                            </tr>

                            <tr>
                                <th>Area of {formData.property_type} of {formData.gut_type}.{formData.gut_no}</th>
                                <td>{formData.area}</td>
                            </tr>
                            <tr>
                                <th>Shape</th>
                                <td>{formData.shape}</td>
                            </tr>
                            <tr>
                                <th>Demarcation</th>
                                <td>{formData.demarcation}</td>
                            </tr>
                            <tr>
                                <th>Frontage Road</th>
                                <td>{formData.frontage_road}</td>
                            </tr>
                            <tr>
                                <th>Plot Surface</th>
                                <td>{formData.plot_surface}</td>
                            </tr>
                            <tr>
                                <th>Surface Type/soil</th>
                                <td>{formData.surface_type}</td>
                            </tr>
                            <tr>
                                <th>N.A. / Non N.A.</th>
                                <td>{formData.na_status}</td>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <td>{formData.title}</td>
                            </tr>
                            <tr>
                                <th>Direction</th>
                                <td>{formData.direction}</td>
                            </tr>
                            <tr>
                                <th>Provision of Electricity</th>
                                <td>{formData.electricity}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>

            {/* PAGE 4: Land Details */}
            <div className="page ">
                <div className="container ">
                    <h1>Land Details</h1>
                    <table className="details-table">
                        <tbody>
                            {/* <tr>
                                <th>Plot No</th>
                                <td>{formData.plot_no}</td>
                            </tr> */}
                            <tr>
                                <th>Location</th>
                                <td>{formData.location}</td>
                            </tr>
                            <tr>
                                <th>Grampanchayat / Municipal</th>
                                <td>{formData.grampanchayat}</td>
                            </tr>
                            <tr>
                                <th>Document Inspected</th>
                                <td>{formData.documents_inspected}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>


                    {/* Loop over all guts */}
                    {formData.gut_type &&
                        formData.guts.length > 0 &&
                        formData.guts
                            .filter((gut) => {
                                // Only include guts that have a number entered
                                const gutNoKey = Object.keys(gut).find((k) => k.startsWith("gut_no"));
                                return gut[gutNoKey] && gut[gutNoKey].trim() !== "";
                            })
                            .map((gut, index) => {
                                const gutNoKey = Object.keys(gut).find((k) => k.startsWith("gut_no"));

                                return (
                                    <div key={index} style={{ marginBottom: "20px" }}>
                                        <h2>
                                            Boundaries of {formData.gut_type}.{gut[gutNoKey]}
                                        </h2>

                                        <table className="boundaries-table">
                                            <tbody>
                                                <tr>
                                                    <th>East</th>
                                                    <td>{gut.east}</td>
                                                </tr>
                                                <tr>
                                                    <th>West</th>
                                                    <td>{gut.west}</td>
                                                </tr>
                                                <tr>
                                                    <th>South</th>
                                                    <td>{gut.south}</td>
                                                </tr>
                                                <tr>
                                                    <th>North</th>
                                                    <td>{gut.north}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })}
                </div>
            </div>





            {/* PAGE 5: Property Information */}
            <div className="page">
                <div className="container ">

                    <table
                        className="specs-table"
                        border={1}
                        cellPadding={8}
                        cellSpacing={0}
                        style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#dcc7c7ff" }}>
                                <th>SPECIFICATIONS</th>
                                <th>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1. Foundation</td>
                                <td>
                                    {[formData.foundation, formData.foundation_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>
                            </tr>

                            <tr>
                                <td>2. Super Structure</td>
                                <td> {[formData.super_structure, formData.super_structure_custom]
                                    .filter(Boolean)
                                    .join(", ")}
                                </td>
                            </tr>
                            <tr>
                                <td>3. Plaster</td>
                                <td> {[formData.plaster, formData.plaster_custom]
                                    .filter(Boolean)
                                    .join(", ")}
                                </td>
                            </tr>
                            <tr>
                                <td>4. Windows</td>
                                <td>
                                    {[formData.windows, formData.windows_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>

                            </tr>
                            <tr>
                                <td>5. Door</td>
                                <td>
                                    {[formData.door, formData.door_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>

                            </tr>
                            <tr>
                                <td>6. Flooring</td>
                                <td>
                                    {[formData.flooring, formData.flooring_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>
                            </tr>
                            <tr>
                                <td>7. Roof</td>
                                <td>
                                    {[formData.roof, formData.roof_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>
                            </tr>
                            <tr>
                                <td>8. Stair Case</td>
                                <td>
                                    {[formData.stair_case, formData.stair_case_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>

                            </tr>
                            <tr>
                                <td>9. Sanitary Ware</td>
                                <td>{formData.sanitary_ware}</td>
                            </tr>
                            <tr>
                                <td>10. Electrification</td>
                                <td>{formData.electrification}</td>
                            </tr>
                            <tr>
                                <td>11. Provision of drinking water</td>
                                <td>{formData.drinking_water}</td>
                            </tr>
                            <tr>
                                <td>12. Coloring</td>
                                <td>
                                    {[formData.coloring, formData.coloring_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>
                            </tr>
                            <tr>
                                <td>13. Kitchen</td>
                                <td>
                                    {[formData.kitchen, formData.kitchen_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>


                            </tr>
                            <tr>
                                <td>14. WC bath</td>
                                <td>{formData.wc_bath}</td>
                            </tr>
                            <tr>
                                <td>15. Compound Wall</td>
                                <td>
                                    {[formData.compound_wall, formData.compound_wall_custom]
                                        .filter(Boolean)
                                        .join(", ")}
                                </td>
                            </tr>
                            <tr>
                                <td>16. MS Gate</td>
                                <td>{formData.ms_gate}</td>
                            </tr>
                            <tr>
                                <td>17. Collapsible Shutter</td>
                                <td>{formData.collapsible_shutter}</td>
                            </tr>
                            <tr>
                                <td>18. MS Safety Door</td>
                                <td>{formData.ms_safety_door}</td>
                            </tr>
                            {/* <tr>
      <td>19. Main door</td>
      <td>{formData.main_door}</td>
    </tr> */}
                            <tr>
                                <td>19. Glazed tile dado for Kitchen &amp; W.C. bath</td>
                                <td>{formData.tile_dado}</td>
                            </tr>
                            <tr>
                                <td>20. Built up area</td>
                                <td>{formData.built_up_area}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>




            {/* PAGE 6: Valuation Details */}


            <div className="page">
                <h2>Property Valuation</h2>
                <div className="valuation-item">
                    <p><strong>1. Fair Market Value of the Property:</strong></p>
                    <p>Fair Market Value of the Property is the most probable price it would sell for on the open market.</p>
                    <p className="value">
                        Rs {Number(formData.fmv).toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>

                <div className="valuation-item">
                    <p><strong>2. Realizable Value of Property – (95% of FMV):</strong></p>
                    <p>Realizable value is the estimated net amount expected to receive from selling an asset in the ordinary course of business minus any cost required to make the sale such as selling expenses, marketing and delivery.</p>
                    <p className="value">
                        Rs {Number(formData.realizable_value || 0).toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>

                <div className="valuation-item">
                    <p><strong>3. Distress/Forced Sale Value of Property – (70% of FMV):</strong></p>
                    <p>Distress value is the estimated price an asset would sell for under urgent, unfavorable conditions, typically being significantly lower than its fair market value due to the seller’s financial distress, time constraints, and limited buyer negotiations.</p>
                    <p className="value">
                        Rs {Number(formData.distress_value || 0).toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>


                <div className="valuation-item">
                    <p>
                        <strong>
                            4. Government Valuation of Property as per R.R. {formData.year_range}:
                        </strong>
                    </p>

                    <p>
                        Rs {formData.government_valuation}
                    </p>

                </div>






            </div>

            {/* PAGE 7: Description & Declaration */}
            <div className="page">

                <div>
                    <h2>Brief Description</h2>
                    <p>
                        Property in the form of {formData.property_type}. Type of soil is {formData.surface_type}.
                        . Water Supply {formData.water}. Property Situated at {formData.location}
                    </p>
                </div>

                <div >
                    <h2>Declaration of Valuer</h2>
                    <p>
                        I hereby declare that I have prepared the valuation report as per site location, document & information supplied by the owner. Valuation report will remain valid only for the purpose for which it is made. Valuation report is valid for six months only.
                    </p>
                </div>

                <div >
                    <p><strong>Signature of Valuer</strong></p>
                </div>

            </div>
        </div>
    );
});

export default Report2;











