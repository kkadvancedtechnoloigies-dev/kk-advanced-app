import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert, TextInput, Linking } from 'react-native';

const COMPANY_INFO = {
  name: 'K.K. ADVANCED TECHNOLOGIES',
  tagline: 'Lab, Analytical & Biomedical Equipment Sales & Service',
  primaryPhone: '8811959370',
  secondaryPhone: '7005222704',
  whatsappNumber: '918811959370',
  regOffice: 'Tenga Basti, Lanka, Dist: Hojai, Assam',
  branchOffice: 'Beltola, Bishnu Rabha Path, Guwahati, Assam',
  gstin: '18BQWPC9056K1Z1',
  website: 'https://kkadvancedtechnologies.netlify.app',
};

const CATALOG = [
  // 1. HEAVY LAB & BIOMEDICAL EQUIPMENT
  { id: '1', category: 'Equipment', name: 'Ultra-Low Temp Freezer (-80°C / -40°C)', spec: 'Cascade Refrigeration System, Microprocessor PID Controller, SS-304 Interior', price: 285000, status: 'Available' },
  { id: '2', category: 'Equipment', name: 'Deep Freezer (-20°C Vertical/Chest)', spec: 'Heavy Duty Compressor, Digital Temp Indicator, High-Density PUF Insulation', price: 48000, status: 'Available' },
  { id: '3', category: 'Equipment', name: 'Autoclave (Vertical & Horizontal)', spec: 'High-Pressure Steam Sterilizer, Automatic Pressure Control, Radial Locking', price: 32000, status: 'Available' },
  { id: '4', category: 'Equipment', name: 'Biosafety Cabinet (Class II A2 / B2)', spec: 'ULPA/HEPA Filter 99.999%, UV Lamp, Motorized Sash, Airflow Alarm', price: 115000, status: 'Available' },
  { id: '5', category: 'Equipment', name: 'Laminar Air Flow (Horizontal / Vertical)', spec: 'HEPA Filter 0.3 Micron, SS-304 Work Table, Manometer & UV Light', price: 42000, status: 'Available' },
  { id: '6', category: 'Equipment', name: 'BOD & Bacteriological Incubator', spec: '5°C to 60°C Range, Forced Air Circulation, Inner Glass Door', price: 38000, status: 'Available' },
  { id: '7', category: 'Equipment', name: 'CO2 Incubator', spec: 'IR CO2 Sensor, Direct Heat & Air Jacket, HEPA Filtration, Sterilization Cycle', price: 195000, status: 'On Order' },
  { id: '8', category: 'Equipment', name: 'Hot Air Oven & Vacuum Oven', spec: 'Up to 250°C, Digital PID Controller, Air Circulating Fan', price: 18500, status: 'Available' },
  { id: '9', category: 'Equipment', name: 'Muffle Furnace (High Temp)', spec: '1000°C / 1200°C / 1400°C, Ceramic Fiber Insulation, Thyristor Control', price: 26000, status: 'Available' },
  { id: '10', category: 'Equipment', name: 'Fume Hood (Ducted / Ductless)', spec: 'Chemical Resistant FRP/PP Lining, Exhaust Blower, Water & Gas Valves', price: 65000, status: 'Available' },
  { id: '11', category: 'Equipment', name: 'Blood Bank Refrigerator (+4°C)', spec: '7-Day Circular Chart Recorder, Audio-Visual Alarm, Glass Door', price: 78000, status: 'Available' },
  { id: '12', category: 'Equipment', name: 'Plant Growth & Stability Chamber', spec: 'Programmable Temp, Humidity (RH%) & Lux Light Control', price: 145000, status: 'On Order' },

  // 2. ANALYTICAL & GENERAL INSTRUMENTS
  { id: '13', category: 'Instruments', name: 'UV-Visible Spectrophotometer', spec: 'Single/Double Beam, 190-1100 nm Wavelength, USB & PC Software', price: 85000, status: 'Available' },
  { id: '14', category: 'Instruments', name: 'Analytical & Precision Balance (0.1mg)', spec: '0.1mg / 1mg Readability, Internal Calibration, Draft Shield', price: 34000, status: 'Available' },
  { id: '15', category: 'Instruments', name: 'Refrigerated & High-Speed Centrifuge', spec: 'Up to 16,000 RPM, Brushless Motor, Rotor Auto-Recognition', price: 54000, status: 'Available' },
  { id: '16', category: 'Instruments', name: 'Binocular / Trinocular Microscope', spec: 'LED Illumination, Plan Achromatic Objectives, Camera Compatible', price: 16500, status: 'Available' },
  { id: '17', category: 'Instruments', name: 'Digital pH, Conductivity & TDS Meter', spec: 'Auto Buffer Recognition, ATC Probe, Data Logging', price: 8500, status: 'Available' },
  { id: '18', category: 'Instruments', name: 'Rotary Vacuum Evaporator', spec: 'Digital Water/Oil Bath, Motorized Lift, Borosilicate Condenser', price: 46000, status: 'Available' },
  { id: '19', category: 'Instruments', name: 'Water Purification System (Type I / II)', spec: 'RO + DI + UV Ultra-Pure Water (18.2 MΩ·cm) for HPLC/PCR', price: 92000, status: 'Available' },
  { id: '20', category: 'Instruments', name: 'Ultrasonic Cleaner / Bath', spec: '40 kHz Frequency, Digital Timer & Heater, SS Tank', price: 12500, status: 'Available' },
  { id: '21', category: 'Instruments', name: 'Magnetic Stirrer with Hot Plate', spec: 'Ceramic Coated Top, Up to 1500 RPM, PT-1000 Temp Probe', price: 7200, status: 'Available' },
  { id: '22', category: 'Instruments', name: 'Vortex Mixer & Orbital Shaker', spec: 'Variable Speed, Touch & Continuous Mode, Multiple Attachments', price: 9800, status: 'Available' },
  { id: '23', category: 'Instruments', name: 'ELISA Reader & Washer', spec: '8-Channel Optical System, Touch Screen, Multi-Wavelength Filters', price: 110000, status: 'On Order' },
  { id: '24', category: 'Instruments', name: 'PCR Thermal Cycler & Gel Doc System', spec: 'Gradient Block, Fast Ramping, UV/Blue Light Transilluminator', price: 165000, status: 'On Order' },

  // 3. GLASSWARE & PLASTICWARE
  { id: '25', category: 'Glassware', name: 'Borosilicate Beakers & Conical Flasks Set', spec: 'Class A / B, Low Expansion 3.3 Borosilicate Glass (50ml to 5000ml)', price: 2400, status: 'In Stock' },
  { id: '26', category: 'Glassware', name: 'Volumetric Flasks, Burettes & Pipettes', spec: 'NABL Certified Class A Amber & Clear Glassware', price: 3200, status: 'In Stock' },
  { id: '27', category: 'Glassware', name: 'Measuring Cylinders & Reagent Bottles', spec: 'Autoclavable Screw Cap Bottles, Hexagonal Base Cylinders', price: 1800, status: 'In Stock' },
  { id: '28', category: 'Glassware', name: 'Condensers, Distillation & Soxhlet Sets', spec: 'Interchangeable Ground Glass Joints (B14, B19, B24, B29)', price: 4500, status: 'In Stock' },
  { id: '29', category: 'Glassware', name: 'Micropipettes (Single & Multi-Channel)', spec: 'Fully Autoclavable, Variable Volume (0.1µl to 10ml), Calibrated', price: 3600, status: 'In Stock' },
  { id: '30', category: 'Glassware', name: 'Petri Dishes, Test Tubes & Cryo Vials', spec: 'Sterile Disposable & Borosilicate Reusable, Falcon Centrifuge Tubes', price: 1500, status: 'In Stock' },

  // 4. SPARE PARTS & HARDWARE COMPONENTS
  { id: '31', category: 'Spare Parts', name: 'Refrigeration Compressors (Secop / Danfoss)', spec: 'R134a, R404a, R290, R508B Cascade & Ultra-Low Temp Compressors', price: 14500, status: 'In Stock' },
  { id: '32', category: 'Spare Parts', name: 'PID Digital Temperature Controller', spec: 'Universal Input (PT-100, J/K Type), SSR/Relay Output, Auto-Tuning', price: 2200, status: 'In Stock' },
  { id: '33', category: 'Spare Parts', name: 'PT-100 RTD & Humidity Sensors', spec: 'High-Precision Stainless Steel Probes & Capacitive RH% Sensors', price: 1100, status: 'In Stock' },
  { id: '34', category: 'Spare Parts', name: 'Solenoid Valves & Expansion Valves', spec: 'Danfoss/Castel Refrigeration Solenoid Coils, Capillary & Filter Driers', price: 1850, status: 'In Stock' },
  { id: '35', category: 'Spare Parts', name: 'Silicone & Magnetic Door Gaskets', spec: 'Custom Size High-Temp Oven & Sub-Zero Freezer Door Seals', price: 1600, status: 'In Stock' },
  { id: '36', category: 'Spare Parts', name: 'Heating Elements & SSR Relays', spec: 'Tubular Air Heaters, Immersion Autoclave Heaters, Kanthal Furnace Coils', price: 1900, status: 'In Stock' },
  { id: '37', category: 'Spare Parts', name: 'H14 HEPA Filters & Pre-Filters', spec: 'Mini-Pleat H14 HEPA Filters (99.995%) for LAF & Biosafety Cabinets', price: 6500, status: 'In Stock' },
  { id: '38', category: 'Spare Parts', name: 'UV Germicidal Tubes & Quartz Sleeves', spec: '253.7nm UVC Lamps, Electronic Chokes, Water Purifier UV Lamps', price: 1400, status: 'In Stock' },
  { id: '39', category: 'Spare Parts', name: 'Vacuum Pumps & Diaphragm Kits', spec: 'Oil-Free Diaphragm & Rotary Vane Pump Spares, Vacuum Gauges', price: 8500, status: 'In Stock' },
  { id: '40', category: 'Spare Parts', name: 'Online UPS Battery Bank & Power Spares', spec: 'SMF Batteries, Inverter/UPS Maintenance & Replacement', price: 4200, status: 'In Stock' },

  // 5. CHEMICALS, REAGENTS & CONSUMABLES
  { id: '41', category: 'Chemicals', name: 'AR / GR / HPLC Grade Laboratory Chemicals', spec: 'Solvents, Acids, Salts, Buffers & Indicators (Merck / HiMedia / SRL)', price: 2500, status: 'In Stock' },
  { id: '42', category: 'Chemicals', name: 'Microbiological Dehydrated Culture Media', spec: 'Nutrient Agar, MacConkey, EMB, Sabouraud Dextrose Agar & Broths', price: 2800, status: 'In Stock' },
  { id: '43', category: 'Chemicals', name: 'Whatman Filter Papers & Syringe Filters', spec: 'Ashless Filter Papers No. 1, 41, 42 & 0.22µm/0.45µm Nylon/PTFE', price: 1650, status: 'In Stock' },
  { id: '44', category: 'Chemicals', name: 'pH Buffer & Conductivity Standard Solutions', spec: 'NIST Traceable pH 4.0, 7.0, 9.2 Calibration Buffers & Electrode Storage', price: 950, status: 'In Stock' },

  // 6. TECHNICAL SERVICES & CALIBRATION
  { id: '45', category: 'Services', name: 'Emergency On-Site Breakdown Repair', spec: 'Expert Troubleshooting for Freezers, Autoclaves, Centrifuges & Ovens', price: 2500, status: '24/7 Active' },
  { id: '46', category: 'Services', name: 'Cascade Gas Charging & Compressor Replacement', spec: 'Vacuum Dehydration, Leak Testing & Refrigerant Retrofitting', price: 8500, status: 'Book Now' },
  { id: '47', category: 'Services', name: 'NABL / ISO Calibration & Validation', spec: 'Traceable Calibration for Temp, RPM, Pressure, Balance & Pipettes', price: 3500, status: 'Book Now' },
  { id: '48', category: 'Services', name: 'Temperature Mapping & IQ/OQ/PQ Qualification', spec: 'Multi-Point Data Logging Report for Cold Rooms, Freezers & Incubators', price: 12000, status: 'Book Now' },
  { id: '49', category: 'Services', name: 'Annual Maintenance Contract (AMC / CMC)', spec: 'Scheduled Preventive Maintenance, Priority Visits & Spare Support', price: 15000, status: 'Book Now' },
  { id: '50', category: 'Services', name: 'New Lab Turnkey Setup & Installation', spec: 'Lab Furniture, Fume Hood Ducting, Equipment Commissioning & Training', price: 25000, status: 'Book Now' },
];

const CATEGORIES = ['All', 'Equipment', 'Instruments', 'Glassware', 'Spare Parts', 'Chemicals', 'Services'];

export default function App() {
  const [activeScreen, setActiveScreen] = useState('catalog'); // 'catalog' | 'quote' | 'service' | 'contact'
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteCart, setQuoteCart] = useState([]);

  // Service Booking Form States
  const [clientName, setClientName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [serviceType, setServiceType] = useState('Breakdown Repair');
  const [issueDetails, setIssueDetails] = useState('');

  const filteredItems = CATALOG.filter((item) => {
    const matchesCategory = selectedTab === 'All' || item.category === selectedTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.spec.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart / Quote Calculator Functions
  const addToQuote = (item) => {
    setQuoteCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    Alert.alert('Added to Quote List', `"${item.name}" aapke GST Estimate list mein jud gaya hai.`);
  };

  const updateQty = (id, delta) => {
    setQuoteCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const subTotal = quoteCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gstAmount = Math.round(subTotal * 0.18);
  const grandTotal = subTotal + gstAmount;

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('WhatsApp Info', 'Seedha call karein: ' + COMPANY_INFO.primaryPhone);
    });
  };

  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Call Info', 'Number: ' + phoneNumber);
    });
  };

  const sendFullQuoteOnWhatsApp = () => {
    if (quoteCart.length === 0) return;
    const itemsList = quoteCart
      .map((item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.qty}) - ₹${(item.price * item.qty).toLocaleString('en-IN')}`)
      .join('\n');
    const msg = `*OFFICIAL ESTIMATE / QUOTATION REQUEST*\n*${COMPANY_INFO.name}*\nGSTIN: ${COMPANY_INFO.gstin}\n\n*Selected Items:*\n${itemsList}\n\n*Sub-Total:* ₹${subTotal.toLocaleString('en-IN')}\n*GST (18%):* ₹${gstAmount.toLocaleString('en-IN')}\n*Estimated Total:* ₹${grandTotal.toLocaleString('en-IN')}\n\nKripya final proforma invoice aur delivery time bhejein.`;
    openWhatsApp(msg);
  };

  const handleServiceSubmit = () => {
    if (!clientName || !equipmentName) {
      Alert.alert('Details Adhuri Hain', 'Kripya apna Naam aur Equipment ka naam zaroor bharein.');
      return;
    }
    const msg = `*NEW SERVICE / CALIBRATION TICKET*\n*${COMPANY_INFO.name}*\n\n*Client:* ${clientName}\n*Institute/Lab:* ${instituteName || 'N/A'}\n*Phone:* ${clientPhone || 'N/A'}\n*Service Type:* ${serviceType}\n*Equipment:* ${equipmentName}\n*Issue Details:* ${issueDetails || 'General Checkup'}`;
    openWhatsApp(msg);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.companyName}>{COMPANY_INFO.name}</Text>
            <Text style={styles.tagline}>{COMPANY_INFO.tagline}</Text>
          </View>
          <View style={styles.quickActionRow}>
            <TouchableOpacity style={styles.iconBtnCall} onPress={() => makeCall(COMPANY_INFO.primaryPhone)}>
              <Text style={styles.iconBtnText}>📞 Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtnWA} onPress={() => openWhatsApp('Hello K.K. Advanced Technologies, mujhe sales/service ke baare mein baat karni hai.')}>
              <Text style={styles.iconBtnText}>💬 WA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeScreen === 'catalog' && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search 50+ equipment, spares, glassware..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}
      </View>

      {/* SCREEN 1: A-TO-Z CATALOG */}
      {activeScreen === 'catalog' && (
        <View style={{ flex: 1 }}>
          <View style={styles.tabWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
              {CATEGORIES.map((tab) => (
                <TouchableOpacity 
                  key={tab} 
                  style={[styles.tab, selectedTab === tab && styles.activeTab]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.countBar}>
            <Text style={styles.countText}>Showing {filteredItems.length} A-to-Z Items</Text>
            {quoteCart.length > 0 && (
              <TouchableOpacity onPress={() => setActiveScreen('quote')}>
                <Text style={styles.viewCartLink}>View Estimate ({quoteCart.length}) →</Text>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={styles.listContainer}>
            {filteredItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.badge}>{item.category}</Text>
                  <Text style={styles.priceTag}>Est. ₹{item.price.toLocaleString('en-IN')}</Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSpec}>{item.spec}</Text>
                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={styles.addQuoteBtn} 
                    onPress={() => addToQuote(item)}
                  >
                    <Text style={styles.buttonText}>+ Add to Quote</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.waButton} 
                    onPress={() => openWhatsApp(`Hello K.K. Advanced Technologies,\nMujhe *${item.name}* (${item.category}) ka official quotation chahiye.`)}
                  >
                    <Text style={styles.buttonText}>💬 Ask WA</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ height: 30 }} />
          </ScrollView>
        </View>
      )}

      {/* SCREEN 2: GST QUOTATION & ESTIMATE CALCULATOR */}
      {activeScreen === 'quote' && (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.sectionTitle}>GST Quotation & Estimate Builder</Text>
          <Text style={styles.sectionSub}>Items chunein aur 18% GST ke saath instant estimate WhatsApp par bhejein.</Text>

          {quoteCart.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Abhi aapki Quotation list khali hai.</Text>
              <TouchableOpacity style={styles.submitBtn} onPress={() => setActiveScreen('catalog')}>
                <Text style={styles.submitBtnText}>+ Catalog se Items Jodein</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {quoteCart.map((item) => (
                <View key={item.id} style={styles.cartCard}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>₹{item.price.toLocaleString('en-IN')} × {item.qty} = ₹{(item.price * item.qty).toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.qtyControls}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.qty}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              <View style={styles.billCard}>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Sub-Total:</Text>
                  <Text style={styles.billVal}>₹{subTotal.toLocaleString('en-IN')}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>GST (18%):</Text>
                  <Text style={styles.billVal}>₹{gstAmount.toLocaleString('en-IN')}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.billRow}>
                  <Text style={styles.grandLabel}>Grand Total:</Text>
                  <Text style={styles.grandVal}>₹{grandTotal.toLocaleString('en-IN')}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={sendFullQuoteOnWhatsApp}>
                <Text style={styles.submitBtnText}>💬 Send Complete GST Quote on WhatsApp</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* SCREEN 3: SERVICE BOOKING FORM */}
      {activeScreen === 'service' && (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Book Technical Service / Calibration</Text>
          <Text style={styles.sectionSub}>Apni machine ki details bharein, seedha humare engineer ko ticket jayega.</Text>

          <Text style={styles.label}>Service Type Chunein:</Text>
          <View style={styles.chipRow}>
            {['Breakdown Repair', 'NABL Calibration', 'AMC / CMC', 'New Installation'].map((type) => (
              <TouchableOpacity 
                key={type} 
                style={[styles.chip, serviceType === type && styles.activeChip]}
                onPress={() => setServiceType(type)}
              >
                <Text style={[styles.chipText, serviceType === type && styles.activeChipText]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Aapka Naam *</Text>
          <TextInput style={styles.input} placeholder="Enter your full name" value={clientName} onChangeText={setClientName} />

          <Text style={styles.label}>Institute / University / Lab Name</Text>
          <TextInput style={styles.input} placeholder="e.g. NEHU, NIT, Hospital, Lab..." value={instituteName} onChangeText={setInstituteName} />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput style={styles.input} placeholder="Enter contact number" keyboardType="phone-pad" value={clientPhone} onChangeText={setClientPhone} />

          <Text style={styles.label}>Equipment / Machine Name *</Text>
          <TextInput style={styles.input} placeholder="e.g. -80°C Freezer, Autoclave, UPS..." value={equipmentName} onChangeText={setEquipmentName} />

          <Text style={styles.label}>Problem / Requirement Details</Text>
          <TextInput 
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]} 
            placeholder="Describe error code, cooling issue, or calibration requirement..." 
            multiline 
            value={issueDetails} 
            onChangeText={setIssueDetails} 
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleServiceSubmit}>
            <Text style={styles.submitBtnText}>💬 Send Service Ticket on WhatsApp</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* SCREEN 4: CONTACT & COMPANY DETAILS */}
      {activeScreen === 'contact' && (
        <ScrollView style={styles.formContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>{COMPANY_INFO.name}</Text>
            <Text style={styles.infoGst}>GSTIN: {COMPANY_INFO.gstin}</Text>

            <View style={styles.divider} />

            <Text style={styles.infoLabel}>📍 Registered Office:</Text>
            <Text style={styles.infoValue}>{COMPANY_INFO.regOffice}</Text>

            <Text style={styles.infoLabel}>🏢 Branch Office:</Text>
            <Text style={styles.infoValue}>{COMPANY_INFO.branchOffice}</Text>

            <View style={styles.divider} />

            <Text style={styles.infoLabel}>📞 Direct Support & Sales:</Text>
            <TouchableOpacity style={styles.contactBtn} onPress={() => makeCall(COMPANY_INFO.primaryPhone)}>
              <Text style={styles.contactBtnText}>Call Primary: +91 {COMPANY_INFO.primaryPhone}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactBtn} onPress={() => makeCall(COMPANY_INFO.secondaryPhone)}>
              <Text style={styles.contactBtnText}>Call Secondary: +91 {COMPANY_INFO.secondaryPhone}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.waFullBtn} onPress={() => openWhatsApp('Hello K.K. Advanced Technologies, mujhe quotation/service ke liye sampark karna hai.')}>
              <Text style={styles.contactBtnText}>💬 Chat on WhatsApp ({COMPANY_INFO.primaryPhone})</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveScreen('catalog')}>
          <Text style={[styles.navText, activeScreen === 'catalog' && styles.activeNavText]}>📦 Catalog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveScreen('quote')}>
          <Text style={[styles.navText, activeScreen === 'quote' && styles.activeNavText]}>🧾 Quote ({quoteCart.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveScreen('service')}>
          <Text style={[styles.navText, activeScreen === 'service' && styles.activeNavText]}>🛠️ Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveScreen('contact')}>
          <Text style={[styles.navText, activeScreen === 'contact' && styles.activeNavText]}>📞 Contact</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { backgroundColor: '#0F172A', padding: 14, paddingTop: 32 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  companyName: { color: '#38BDF8', fontSize: 15, fontWeight: 'bold' },
  tagline: { color: '#CBD5E1', fontSize: 11, marginTop: 2 },
  quickActionRow: { flexDirection: 'row', gap: 6 },
  iconBtnCall: { backgroundColor: '#0284C7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  iconBtnWA: { backgroundColor: '#16A34A', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  iconBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  searchInput: { backgroundColor: '#1E293B', color: '#FFFFFF', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 12, marginTop: 10, borderWidth: 1, borderColor: '#334155' },
  tabWrapper: { backgroundColor: '#FFFFFF', elevation: 2 },
  tabContainer: { paddingHorizontal: 10, paddingVertical: 8 },
  tab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#F1F5F9', marginRight: 6 },
  activeTab: { backgroundColor: '#0284C7' },
  tabText: { color: '#475569', fontSize: 12, fontWeight: '600' },
  activeTabText: { color: '#FFFFFF' },
  countBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingTop: 8 },
  countText: { fontSize: 11, color: '#64748B', fontWeight: '600' },
  viewCartLink: { fontSize: 12, color: '#0284C7', fontWeight: 'bold' },
  listContainer: { padding: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 14, marginBottom: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  badge: { backgroundColor: '#E0F2FE', color: '#0369A1', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  priceTag: { fontSize: 12, fontWeight: 'bold', color: '#0F172A' },
  status: { color: '#16A34A', fontSize: 11, fontWeight: 'bold' },
  itemName: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginTop: 4 },
  itemSpec: { fontSize: 12, color: '#64748B', marginTop: 3, marginBottom: 10, lineHeight: 17 },
  cardActions: { flexDirection: 'row', gap: 8 },
  addQuoteBtn: { flex: 1, backgroundColor: '#0284C7', paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
  waButton: { flex: 1, backgroundColor: '#16A34A', paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  formContainer: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  sectionSub: { fontSize: 12, color: '#64748B', marginTop: 4, marginBottom: 14 },
  emptyBox: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  emptyText: { fontSize: 14, color: '#64748B', marginBottom: 12 },
  cartCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 10, marginBottom: 8, alignItems: 'center', elevation: 1 },
  cartItemName: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },
  cartItemPrice: { fontSize: 12, color: '#0284C7', fontWeight: '600', marginTop: 2 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { backgroundColor: '#E2E8F0', width: 28, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  qtyValue: { fontSize: 14, fontWeight: 'bold', minWidth: 16, textAlign: 'center' },
  billCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, marginTop: 10, elevation: 2 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 },
  billLabel: { fontSize: 13, color: '#475569' },
  billVal: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  grandLabel: { fontSize: 15, fontWeight: 'bold', color: '#0F172A' },
  grandVal: { fontSize: 16, fontWeight: 'bold', color: '#16A34A' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#334155', marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9, fontSize: 13 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, backgroundColor: '#E2E8F0' },
  activeChip: { backgroundColor: '#0284C7' },
  chipText: { fontSize: 11, color: '#334155', fontWeight: '600' },
  activeChipText: { color: '#FFFFFF' },
  submitBtn: { backgroundColor: '#16A34A', paddingVertical: 13, borderRadius: 8, alignItems: 'center', marginTop: 16, paddingHorizontal: 16 },
  submitBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, elevation: 2 },
  infoTitle: { fontSize: 17, fontWeight: 'bold', color: '#0F172A' },
  infoGst: { fontSize: 12, fontWeight: 'bold', color: '#0284C7', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  infoLabel: { fontSize: 12, fontWeight: 'bold', color: '#475569', marginTop: 6 },
  infoValue: { fontSize: 13, color: '#1E293B', marginTop: 2, marginBottom: 8 },
  contactBtn: { backgroundColor: '#0F172A', paddingVertical: 11, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  waFullBtn: { backgroundColor: '#16A34A', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  contactBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#CBD5E1', paddingVertical: 10 },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 11, fontWeight: '600', color: '#64748B' },
  activeNavText: { color: '#0284C7', fontWeight: 'bold' },
});
