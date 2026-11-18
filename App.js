import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Linking,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const COMPANY_INFO = {
  name: "K.K. ADVANCED TECHNOLOGIES",
  tagline: "Lab, Analytical & Biomedical Equipment Sales & Service",
  primaryPhone: "8811959370",
  secondaryPhone: "7005222704",
  whatsappNumber: "918811959370",
  regOffice: "Tungi Basti, Lanka, Dist: Hojai, Assam",
  branchOffice: "Beltola, Bishnu Rabha Path, Guwahati, Assam",
  gstin: "18QAQPC0556K1ZI",
  website: "https://kkadvancedtechnologies.netlify.app/"
};

const CATALOG = [
  // 1. HEAVY LAB & BIOMEDICAL EQUIPMENT
  { id: '1', category: 'Equipment', name: 'Ultra-Low Temp Freezer (-30°C / -80°C)', spec: 'Cascade Refrigeration System, Microprocessor Controller', price: 285000, hsn: '8418', gstRate: 18 },
  { id: '2', category: 'Equipment', name: 'Deep Freezer (-20°C Vertical/Chest)', spec: 'Heavy Duty Compressor, Digital Temperature Display', price: 95000, hsn: '8418', gstRate: 18 },
  { id: '3', category: 'Equipment', name: 'Autoclave (Vertical & Horizontal)', spec: 'High-Pressure Steam Sterilizer, Automatic Purging', price: 120000, hsn: '8419', gstRate: 18 },
  { id: '4', category: 'Equipment', name: 'Biosafety Cabinet (Class II A2 / B2)', spec: 'ULPA/HEPA Filter 99.999%, UV Lamp, Air Barrier', price: 165000, hsn: '8421', gstRate: 18 },
  { id: '5', category: 'Equipment', name: 'BOD & Bacteriological Incubator', spec: '5°C to 60°C Range, Forced Air Circulation, Digital PID', price: 78000, hsn: '8419', gstRate: 18 },
  { id: '6', category: 'Equipment', name: 'CO2 Incubator', spec: 'IR CO2 Sensor, Direct Heat & Air Jacket, HEPA Filtration', price: 340000, hsn: '8419', gstRate: 18 },
  { id: '7', category: 'Equipment', name: 'Hot Air Oven & Vacuum Oven', spec: 'Up to 250°C, Original PID Controller, Air Circulation', price: 65000, hsn: '8419', gstRate: 18 },
  { id: '8', category: 'Equipment', name: 'Muffle Furnace (High Temp)', spec: '1000°C / 1200°C / 1400°C, Ceramic Fiber Insulation', price: 92000, hsn: '8514', gstRate: 18 },
  { id: '9', category: 'Equipment', name: 'Fume Hood (Ducted / Ductless)', spec: 'Chemical Resistant PP/FRP Lining, Exhaust Blower', price: 145000, hsn: '8421', gstRate: 18 },
  { id: '10', category: 'Equipment', name: 'Blood Bank Refrigerator (-4°C)', spec: '7-Day Circular Chart Recorder, Audio-Visual Alarms', price: 210000, hsn: '8418', gstRate: 18 },
  { id: '11', category: 'Equipment', name: 'Plant Growth & Stability Chamber', spec: 'Programmable Temp, Humidity (RH) & Lux Control', price: 380000, hsn: '8419', gstRate: 18 },

  // 2. ANALYTICAL & GENERAL INSTRUMENTS
  { id: '12', category: 'Instruments', name: 'UV-Visible Spectrophotometer', spec: 'Single/Double Beam, 190-1100 nm Wavelength Range', price: 175000, hsn: '9027', gstRate: 18 },
  { id: '13', category: 'Instruments', name: 'Analytical & Precision Balance (0.1mg)', spec: '0.1mg / 1mg Readability, Internal Calibration', price: 85000, hsn: '9016', gstRate: 18 },
  { id: '14', category: 'Instruments', name: 'Refrigerated & High-Speed Centrifuge', spec: 'Up to 16,000 RPM, Brushless Motor, Rotor Options', price: 135000, hsn: '8421', gstRate: 18 },
  { id: '15', category: 'Instruments', name: 'Binocular / Trinocular Microscope', spec: 'LCD Illumination, Plan Achromatic Objectives', price: 55000, hsn: '9011', gstRate: 18 },
  { id: '16', category: 'Instruments', name: 'Digital pH, Conductivity & TDS Meter', spec: 'Auto Buffer Recognition, ATC Probe Included', price: 18000, hsn: '9027', gstRate: 18 },
  { id: '17', category: 'Instruments', name: 'Rotary Vacuum Evaporator', spec: 'Digital Water/Oil Bath, Motorized Lift, Condenser', price: 160000, hsn: '8419', gstRate: 18 },
  { id: '18', category: 'Instruments', name: 'Water Purification System (Type I / II)', spec: 'RO + DI + UV Ultra-Pure Water Output', price: 195000, hsn: '8421', gstRate: 18 },
  { id: '19', category: 'Instruments', name: 'Ultrasonic Cleaner / Bath', spec: '40 kHz Frequency, Digital Timer & Heater', price: 28000, hsn: '8479', gstRate: 18 },
  { id: '20', category: 'Instruments', name: 'Magnetic Stirrer with Hot Plate', spec: 'Ceramic Coated Top, Up to 1500 RPM, 350°C', price: 15000, hsn: '8479', gstRate: 18 },
  { id: '21', category: 'Instruments', name: 'Vortex Mixer & Dental Shaker', spec: 'Variable Speed, Touch & Continuous Modes', price: 12000, hsn: '8479', gstRate: 18 },
  { id: '22', category: 'Instruments', name: 'ELISA Reader & Washer', spec: '8-Channel Optical System, Touch Screen, Multi-Assay', price: 240000, hsn: '9027', gstRate: 18 },
  { id: '23', category: 'Instruments', name: 'PCR Thermal Cycler & Gel Doc System', spec: 'Gradient Block, Fast Ramping, High Resolution CCD', price: 390000, hsn: '9027', gstRate: 18 },

  // 3. GLASSWARE & PLASTICWARE
  { id: '24', category: 'Glassware', name: 'Borosilicate Beakers & Conical Flasks Set', spec: 'Class A / B, Low Expansion, Graduated', price: 4500, hsn: '7017', gstRate: 18 },
  { id: '25', category: 'Glassware', name: 'Volumetric Flasks, Burettes & Pipettes', spec: 'NABL Certified Class A Amber & Clear Glass', price: 8500, hsn: '7017', gstRate: 18 },
  { id: '26', category: 'Glassware', name: 'Measuring Cylinders & Reagent Bottles', spec: 'Autoclavable Screw Cap, Borosilicate 3.3', price: 6200, hsn: '7017', gstRate: 18 },
  { id: '27', category: 'Glassware', name: 'Condensers, Distillation & Soxhlet Set', spec: 'Interchangeable Ground Glass Joints', price: 14000, hsn: '7017', gstRate: 18 },
  { id: '28', category: 'Glassware', name: 'Microscopes (Single & Multi-Channel)', spec: 'Fully Autoclavable, Variable Volume Pipettes', price: 18500, hsn: '9017', gstRate: 18 },
  { id: '29', category: 'Glassware', name: 'Petri Dishes, Test Tubes & Cryo Vials', spec: 'Sterile Disposable & Reusable Borosilicate', price: 3500, hsn: '3926', gstRate: 18 },

  // 4. SPARE PARTS & PACKAGE COMPONENTS
  { id: '30', category: 'Spare Parts', name: 'Refrigeration Compressors (Secop / Danfoss)', spec: 'R134a, R404a, R290, R600a Heavy Duty', price: 18000, hsn: '8414', gstRate: 18 },
  { id: '31', category: 'Spare Parts', name: 'PID Digital Temperature Controller', spec: 'Universal Input (PT-100, J/K Type), SSR Output', price: 4500, hsn: '9032', gstRate: 18 },
  { id: '32', category: 'Spare Parts', name: 'PT-100 RTD & Humidity Sensors', spec: 'High-Precision Stainless Steel Probe, 3-Wire', price: 3200, hsn: '9033', gstRate: 18 },
  { id: '33', category: 'Spare Parts', name: 'Solenoid Valves & Expansion Valves', spec: 'Danfoss/Castel Refrigeration Solenoid Valves', price: 5500, hsn: '8481', gstRate: 18 },
  { id: '34', category: 'Spare Parts', name: 'Silicone & Magnetic Door Gaskets', spec: 'Custom Size High Temp Oven & Gun Gaskets', price: 2800, hsn: '4016', gstRate: 18 },
  { id: '35', category: 'Spare Parts', name: 'Heating Elements & SSR Relays', spec: 'Tubular Air Heaters, Immersion Coils, Finned Type', price: 6500, hsn: '8516', gstRate: 18 },
  { id: '36', category: 'Spare Parts', name: 'H14 HEPA Filters & Pre-Filters', spec: 'Mini-Pleat HEPA Filters (99.999% Efficiency)', price: 12500, hsn: '8421', gstRate: 18 },
  { id: '37', category: 'Spare Parts', name: 'UV Germicidal Tubes & Quartz Sleeves', spec: '254nm UV Lamps, Electronic Ballasts', price: 4200, hsn: '8539', gstRate: 18 },
  { id: '38', category: 'Spare Parts', name: 'Vacuum Pumps & Diaphragm Kits', spec: 'Oil-Free Diaphragm & Rotary Vane Pump Spares', price: 15000, hsn: '8414', gstRate: 18 },
  { id: '39', category: 'Spare Parts', name: 'Online UPS Battery Bank & Power Spares', spec: 'SMF Batteries, Inverter/UPS Control Cards', price: 22000, hsn: '8507', gstRate: 28 },

  // 5. CHEMICALS, REAGENTS & CONSUMABLES
  { id: '40', category: 'Chemicals', name: 'AR / GR / HPLC Grade Laboratory Chemicals', spec: 'Solvents, Acids, Salts, Buffers (Merck/Fisher)', price: 3500, hsn: '3822', gstRate: 18 },
  { id: '41', category: 'Chemicals', name: 'Microbiological Dehydrated Culture Media', spec: 'Nutrient Agar, MacConkey, Potato Dextrose', price: 6500, hsn: '3821', gstRate: 18 },
  { id: '42', category: 'Chemicals', name: 'Whatman Filter Papers & Syringe Filters', spec: 'Ashless Filter Papers No. 40/41/42, PVDF Filters', price: 4800, hsn: '4823', gstRate: 12 },
  { id: '43', category: 'Chemicals', name: 'pH Buffer & Conductivity Standard Solutions', spec: 'NIST Traceable pH 4.0, 7.0, 10.0 Solutions', price: 2500, hsn: '3822', gstRate: 18 },

  // 6. TECHNICAL SERVICES & CALIBRATION
  { id: '44', category: 'Services', name: 'Emergency On-Site Breakdown Repair', spec: 'Expert Troubleshooting for Freezers, Incubators & Ovens', price: 3500, hsn: '9987', gstRate: 18 },
  { id: '45', category: 'Services', name: 'Cascade Gas Charging & Compressor Replacement', spec: 'Vacuum Dehydration, Leak Testing & Gas Charging', price: 12000, hsn: '9987', gstRate: 18 },
  { id: '46', category: 'Services', name: 'NABL / ISO Calibration & Validation', spec: 'Traceable Calibration for Temp, RH, RPM, Volume', price: 8500, hsn: '9987', gstRate: 18 },
  { id: '47', category: 'Services', name: 'Temperature Mapping & IQ/OQ/PQ Qualification', spec: 'Multi-Point Data Logging & Complete Compliance Docs', price: 25000, hsn: '9987', gstRate: 18 },
  { id: '48', category: 'Services', name: 'Annual Maintenance Contract (AMC / CMC)', spec: 'Scheduled Preventive Maintenance & Priority Support', price: 18000, hsn: '9987', gstRate: 18 },
  { id: '49', category: 'Services', name: 'New Lab Turnkey Setup & Installation', spec: 'Lab Furniture, Fume Hood Piping, Gas Manifold Setup', price: 50000, hsn: '9954', gstRate: 18 },
  { id: '50', category: 'Services', name: 'Equipment Relocation & Preventive Servicing', spec: 'Safe Dismantling, Packing, Transit & Re-Installation', price: 15000, hsn: '9987', gstRate: 18 }
];

const CATEGORIES = ['All', 'Equipment', 'Instruments', 'Glassware', 'Spare Parts', 'Chemicals', 'Services'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Catalog');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quote Cart State
  const [quoteItems, setQuoteItems] = useState([]);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientOrg, setClientOrg] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  // Service Booking State
  const [serviceName, setServiceName] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleCall = async (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Phone call is not supported on this device.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not initiate phone call.");
    }
  };

  const handleWhatsApp = async (number, message) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed or accessible on this device.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not open WhatsApp.");
    }
  };

  const handleWebsite = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open website link.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open website.");
    }
  };

  const addToQuote = (item) => {
    const existing = quoteItems.find(i => i.id === item.id);
    if (existing) {
      setQuoteItems(quoteItems.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setQuoteItems([...quoteItems, { ...item, qty: 1 }]);
    }
    Alert.alert("Added to Estimate", `${item.name} added to your quotation list.`);
  };

  const updateQty = (id, delta) => {
    setQuoteItems(quoteItems.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const removeFromQuote = (id) => {
    setQuoteItems(quoteItems.filter(i => i.id !== id));
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let totalTax = 0;
    quoteItems.forEach(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      totalTax += itemTotal * ((item.gstRate || 18) / 100);
    });
    return {
      subtotal,
      totalTax,
      grandTotal: subtotal + totalTax
    };
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const sendWhatsAppQuote = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      Alert.alert("Required Fields", "Please enter your Name and Mobile Number.");
      return;
    }
    if (!validatePhone(clientPhone)) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }
    if (quoteItems.length === 0) {
      Alert.alert("Empty Quotation", "Please add items from the Catalog first.");
      return;
    }

    const { subtotal, totalTax, grandTotal } = calculateTotals();
    
    let msg = `*ESTIMATED QUOTATION - K.K. ADVANCED TECHNOLOGIES*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Client Name:* ${clientName}\n`;
    msg += `*Organization:* ${clientOrg || 'N/A'}\n`;
    msg += `*Phone:* ${clientPhone}\n`;
    msg += `*Address:* ${clientAddress || 'N/A'}\n`;
    msg += `*Date:* ${new Date().toLocaleDateString()}\n`;
    msg += `----------------------------------------\n\n`;
    msg += `*Requested Items / Services:*\n`;

    quoteItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   Spec: ${item.spec}\n`;
      msg += `   HSN/SAC: ${item.hsn} | GST: ${item.gstRate}%\n`;
      msg += `   Qty: ${item.qty} x ₹${item.price.toLocaleString('en-IN')} = ₹${(item.price * item.qty).toLocaleString('en-IN')}\n\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    msg += `*Total GST:* ₹${totalTax.toLocaleString('en-IN')}\n`;
    msg += `*Estimated Grand Total:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
    msg += `----------------------------------------\n`;
    msg += `_Note: This is an estimated quotation, not a final tax invoice._\n`;
    msg += `Thank you for choosing ${COMPANY_INFO.name}!`;

    handleWhatsApp(COMPANY_INFO.whatsappNumber, msg);
  };

  const sendServiceBooking = () => {
    if (!serviceName.trim() || !servicePhone.trim() || !equipmentType.trim()) {
      Alert.alert("Required Fields", "Please fill in your Name, Phone Number, and Equipment Type.");
      return;
    }
    if (!validatePhone(servicePhone)) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    let msg = `*SERVICE & REPAIR BOOKING REQUEST*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Customer Name:* ${serviceName}\n`;
    msg += `*Phone:* ${servicePhone}\n`;
    msg += `*Equipment:* ${equipmentType}\n`;
    msg += `*Preferred Date:* ${preferredDate || 'Immediate'}\n`;
    msg += `*Issue Description:* ${issueDescription || 'General Service / Maintenance'}\n`;
    msg += `----------------------------------------\n`;
    msg += `Please confirm the technician visit.`;

    handleWhatsApp(COMPANY_INFO.whatsappNumber, msg);
  };

  const sendContactMessage = () => {
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      Alert.alert("Required Fields", "Please fill in Name, Phone, and your Message.");
      return;
    }
    if (!validatePhone(contactPhone)) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    let msg = `*CUSTOMER INQUIRY / MESSAGE*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Name:* ${contactName}\n`;
    msg += `*Phone:* ${contactPhone}\n`;
    msg += `*Message:* ${contactMessage}\n`;
    msg += `----------------------------------------`;

    handleWhatsApp(COMPANY_INFO.whatsappNumber, msg);
  };

  const filteredCatalog = CATALOG.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.hsn.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B2545" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>K.K. Advanced Technologies</Text>
        <Text style={styles.headerSubtitle}>{COMPANY_INFO.tagline}</Text>
        <View style={styles.quickContactRow}>
          <TouchableOpacity style={styles.quickCallBtn} onPress={() => handleCall(COMPANY_INFO.primaryPhone)}>
            <Text style={styles.quickBtnText}>📞 Call Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickWhatsAppBtn} onPress={() => handleWhatsApp(COMPANY_INFO.whatsappNumber, "Hello, I need assistance with laboratory equipment.")}>
            <Text style={styles.quickBtnText}>💬 WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.navBar}>
        {['Catalog', 'Quote', 'Service Booking', 'Contact'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.navTab, activeTab === tab && styles.activeNavTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.navTabText, activeTab === tab && styles.activeNavTabText]}>
              {tab === 'Quote' && quoteItems.length > 0 ? `Quote (${quoteItems.length})` : tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MAIN CONTENT AREA */}
      <View style={styles.contentArea}>
        
        {/* 1. CATALOG TAB */}
        {activeTab === 'Catalog' && (
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search equipment, instruments, HSN..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catChip, selectedCategory === cat && styles.activeCatChip]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.catChipText, selectedCategory === cat && styles.activeCatChipText]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.listContainer}>
              {filteredCatalog.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No catalog items found matching "{searchQuery}".</Text>
                  <Text style={styles.emptySubtext}>Try searching with different keywords or browse another category.</Text>
                </View>
              ) : (
                filteredCatalog.map(item => (
                  <View key={item.id} style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.itemCategoryBadge}>{item.category}</Text>
                      <Text style={styles.itemHsnText}>HSN/SAC: {item.hsn} | GST: {item.gstRate}%</Text>
                    </View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemSpec} numberOfLines={2}>{item.spec}</Text>
                    <View style={styles.cardFooter}>
                      <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                      <TouchableOpacity style={styles.addQuoteBtn} onPress={() => addToQuote(item)}>
                        <Text style={styles.addQuoteBtnText}>+ Add to Quote</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        )}

        {/* 2. QUOTE / ESTIMATE TAB */}
        {activeTab === 'Quote' && (
          <ScrollView contentContainerStyle={styles.listContainer}>
            <Text style={styles.sectionTitle}>Estimated Quotation Generator</Text>
            <Text style={styles.noticeText}>⚠️ Note: This is an estimated quotation calculator, not a final tax invoice.</Text>

            {quoteItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your quotation list is empty.</Text>
                <Text style={styles.emptySubtext}>Add items from the Catalog tab to build an estimate.</Text>
              </View>
            ) : (
              <>
                {quoteItems.map(item => (
                  <View key={item.id} style={styles.quoteCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.quoteItemName}>{item.name}</Text>
                      <Text style={styles.quoteItemPrice}>₹{item.price.toLocaleString('en-IN')} x {item.qty} = ₹{(item.price * item.qty).toLocaleString('en-IN')}</Text>
                    </View>
                    <View style={styles.qtyControlRow}>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromQuote(item.id)}><Text style={styles.removeBtnText}>🗑️</Text></TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Totals Summary */}
                {(() => {
                  const { subtotal, totalTax, grandTotal } = calculateTotals();
                  return (
                    <View style={styles.summaryCard}>
                      <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal:</Text><Text style={styles.summaryVal}>₹{subtotal.toLocaleString('en-IN')}</Text></View>
                      <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Total Estimated GST:</Text><Text style={styles.summaryVal}>₹{totalTax.toLocaleString('en-IN')}</Text></View>
                      <View style={[styles.summaryRow, styles.grandTotalRow]}><Text style={styles.grandTotalLabel}>Estimated Grand Total:</Text><Text style={styles.grandTotalVal}>₹{grandTotal.toLocaleString('en-IN')}</Text></View>
                    </View>
                  );
                })()}

                <View style={styles.formSection}>
                  <Text style={styles.formHeader}>Customer Details for Quotation</Text>
                  <TextInput style={styles.input} placeholder="Your Name *" placeholderTextColor="#888" value={clientName} onChangeText={setClientName} />
                  <TextInput style={styles.input} placeholder="Mobile Number (10 digits) *" placeholderTextColor="#888" keyboardType="phone-pad" maxLength={10} value={clientPhone} onChangeText={setClientPhone} />
                  <TextInput style={styles.input} placeholder="Hospital / Lab / Organization Name" placeholderTextColor="#888" value={clientOrg} onChangeText={setClientOrg} />
                  <TextInput style={styles.input} placeholder="Delivery Address / City" placeholderTextColor="#888" value={clientAddress} onChangeText={setClientAddress} />

                  <TouchableOpacity style={styles.actionButton} onPress={sendWhatsAppQuote}>
                    <Text style={styles.actionButtonText}>💬 Send Estimated Quotation via WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        )}

        {/* 3. SERVICE BOOKING TAB */}
        {activeTab === 'Service Booking' && (
          <ScrollView contentContainerStyle={styles.listContainer}>
            <Text style={styles.sectionTitle}>Book Equipment Service & Repair</Text>
            <Text style={styles.noticeText}>Request certified NABL calibration, breakdown repair, or preventive maintenance.</Text>

            <View style={styles.formSection}>
              <TextInput style={styles.input} placeholder="Your Full Name *" placeholderTextColor="#888" value={serviceName} onChangeText={setServiceName} />
              <TextInput style={styles.input} placeholder="Mobile Number (10 digits) *" placeholderTextColor="#888" keyboardType="phone-pad" maxLength={10} value={servicePhone} onChangeText={setServicePhone} />
              <TextInput style={styles.input} placeholder="Equipment Type & Brand (e.g., -80 Freezer) *" placeholderTextColor="#888" value={equipmentType} onChangeText={setEquipmentType} />
              <TextInput style={styles.input} placeholder="Preferred Visit Date (DD/MM/YYYY)" placeholderTextColor="#888" value={preferredDate} onChangeText={setPreferredDate} />
              <TextInput style={[styles.input, styles.textArea]} placeholder="Describe Issue or Service Required..." placeholderTextColor="#888" multiline numberOfLines={4} value={issueDescription} onChangeText={setIssueDescription} />

              <TouchableOpacity style={styles.actionButton} onPress={sendServiceBooking}>
                <Text style={styles.actionButtonText}>🛠️ Send Booking Request via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* 4. CONTACT TAB */}
        {activeTab === 'Contact' && (
          <ScrollView contentContainerStyle={styles.listContainer}>
            <View style={styles.contactInfoCard}>
              <Text style={styles.contactCardTitle}>{COMPANY_INFO.name}</Text>
              <Text style={styles.contactCardSub}>{COMPANY_INFO.tagline}</Text>
              <Text style={styles.contactText}>📍 **Reg. Office:** {COMPANY_INFO.regOffice}</Text>
              <Text style={styles.contactText}>📍 **Branch Office:** {COMPANY_INFO.branchOffice}</Text>
              <Text style={styles.contactText}>📜 **GSTIN:** {COMPANY_INFO.gstin}</Text>
              <Text style={styles.contactText}>📞 **Primary Helpline:** {COMPANY_INFO.primaryPhone}</Text>
              <Text style={styles.contactText}>📞 **Secondary Support:** {COMPANY_INFO.secondaryPhone}</Text>

              <View style={styles.contactActionRow}>
                <TouchableOpacity style={styles.contactBtn} onPress={() => handleCall(COMPANY_INFO.primaryPhone)}>
                  <Text style={styles.contactBtnText}>📞 Call Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.contactBtn, styles.waContactBtn]} onPress={() => handleWhatsApp(COMPANY_INFO.whatsappNumber, "Hello, I would like to inquire about lab equipment.")}>
                  <Text style={styles.contactBtnText}>💬 WhatsApp</Text>
                </TouchableOpacity>
              </View>

              {/* Clickable Company Website Button */}
              <TouchableOpacity style={styles.websiteBtn} onPress={() => handleWebsite(COMPANY_INFO.website)}>
                <Text style={styles.websiteBtnText}>🌐 Visit Company Website</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formHeader}>Send Us a Direct Message</Text>
              <TextInput style={styles.input} placeholder="Your Name *" placeholderTextColor="#888" value={contactName} onChangeText={setContactName} />
              <TextInput style={styles.input} placeholder="Mobile Number (10 digits) *" placeholderTextColor="#888" keyboardType="phone-pad" maxLength={10} value={contactPhone} onChangeText={setContactPhone} />
              <TextInput style={[styles.input, styles.textArea]} placeholder="Your Message / Inquiry *" placeholderTextColor="#888" multiline numberOfLines={4} value={contactMessage} onChangeText={setContactMessage} />

              <TouchableOpacity style={styles.actionButton} onPress={sendContactMessage}>
                <Text style={styles.actionButtonText}>📤 Submit Message via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2545',
  },
  header: {
    padding: 16,
    backgroundColor: '#0B2545',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#134074',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFE',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9EE493',
    textAlign: 'center',
    marginTop: 4,
  },
  quickContactRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  quickCallBtn: {
    backgroundColor: '#134074',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  quickWhatsAppBtn: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  quickBtnText: {
    color: '#FFFFFE',
    fontSize: 13,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#134074',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navTab: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeNavTab: {
    backgroundColor: '#8DA9C4',
  },
  navTabText: {
    color: '#EEF4F8',
    fontSize: 12,
    fontWeight: '600',
  },
  activeNavTabText: {
    color: '#0B2545',
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  searchInput: {
    backgroundColor: '#FFFFFE',
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    fontSize: 14,
    color: '#1E293B',
  },
  catScroll: {
    paddingHorizontal: 12,
    marginBottom: 8,
    maxHeight: 45,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    marginRight: 8,
    justifyContent: 'center',
    height: 36,
  },
  activeCatChip: {
    backgroundColor: '#0B2545',
  },
  catChipText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  activeCatChipText: {
    color: '#FFFFFE',
  },
  listContainer: {
    padding: 12,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFE',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemCategoryBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1D4ED8',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  itemHsnText: {
    fontSize: 10,
    color: '#64748B',
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  itemSpec: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#047857',
  },
  addQuoteBtn: {
    backgroundColor: '#0B2545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addQuoteBtnText: {
    color: '#FFFFFE',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B2545',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 12,
    color: '#B45309',
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 6,
    marginBottom: 14,
  },
  quoteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quoteItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  quoteItemPrice: {
    fontSize: 12,
    color: '#047857',
    marginTop: 2,
  },
  qtyControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    backgroundColor: '#E2E8F0',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontWeight: 'bold',
    color: '#1E293B',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    minWidth: 18,
    textAlign: 'center',
  },
  removeBtn: {
    marginLeft: 6,
  },
  removeBtnText: {
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: '#FFFFFE',
    borderRadius: 8,
    padding: 14,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#475569',
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0B2545',
  },
  grandTotalVal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#047857',
  },
  formSection: {
    backgroundColor: '#FFFFFE',
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  formHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0B2545',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 10,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  actionButton: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  actionButtonText: {
    color: '#FFFFFE',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contactInfoCard: {
    backgroundColor: '#FFFFFE',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B2545',
  },
  contactCardSub: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 13,
    color: '#334155',
    marginBottom: 6,
  },
  contactActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  contactBtn: {
    flex: 1,
    backgroundColor: '#134074',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  waContactBtn: {
    backgroundColor: '#2D6A4F',
  },
  contactBtnText: {
    color: '#FFFFFE',
    fontSize: 13,
    fontWeight: 'bold',
  },
  websiteBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  websiteBtnText: {
    color: '#FFFFFE',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
