from sqlalchemy.orm import Session
from app.database.models import Document, DocumentChunk
from app.rag.document_processor import DocumentProcessor

SEED_DOCUMENTS = [
    {
        "title": "ICAR-TNAU Comprehensive Rice Production & Integrated Pest Manual",
        "category": "Cereal Agronomy",
        "crop": "Paddy",
        "topic": "Pest & Disease Management",
        "source": "TNAU Agritech Portal / ICAR-CRRI Cuttack",
        "filename": "tnau_icar_paddy_ipm_manual.txt",
        "content": """
CHAPTER 1: PADDY (RICE) INTEGRATED PEST MANAGEMENT (IPM)

1. Yellow Stem Borer (Scirpophaga incertulas):
The yellow stem borer is the most destructive monophagous pest of paddy in South India. Symptoms include 'dead hearts' during the vegetative tillering stage and 'white ears' or chaffy grains during the reproductive panicle emergence stage.
Management and Prevention:
- Clip the seedling tips before transplanting to eliminate stem borer egg masses.
- Set up light traps and pheromone traps (TNAU Lucure or Helilure) @ 12 traps per hectare for pest monitoring and mass trapping.
- Release egg parasitoid Trichogramma japonicum @ 100,000 adults/ha three times at weekly intervals starting from 30 days after transplanting (DAT).
- Avoid excessive application of nitrogenous fertilizers which causes lush green vegetative growth attracting moths. Use split application of Nitrogen (50% basal, 25% tillering, 25% panicle initiation).
- Biological remedy: Spray Bacillus thuringiensis (Bt) formulation @ 1.5 kg/ha or Neem Seed Kernel Extract (NSKE 5%) during early infestation.
- Safety Caution: Chemical intervention with Chlorantraniliprole 18.5% SC @ 150 ml/ha or Cartap hydrochloride 50% SP @ 1 kg/ha should only be executed when Economic Threshold Level (ETL) exceeds 2 egg masses/m² or 10% dead hearts. Always maintain a Pre-Harvest Interval (PHI) of 21 days and wear protective neoprene gloves and mask during spray.

2. Rice Leaf Folder (Cnaphalocrocis medinalis):
Larvae fold the leaf blades longitudinally and feed on the green mesophyll tissue, creating white longitudinal streaks and papery leaves.
Management:
- Maintain wider spacing (20 x 15 cm) to facilitate sunlight and aeration.
- Release Trichogramma chilonis @ 100,000/ha at weekly intervals.
- Apply 5% Neem oil emulsion or Azadirachtin 0.03% (300 ppm) @ 1000 ml/ha.

3. Paddy Blast Disease (Magnaporthe oryzae):
Spindle-shaped spots with grey centers and brown borders appear on leaf blades (leaf blast), neck node becomes black and breaks (neck blast).
Management:
- Seed treatment with Trichoderma viride @ 4 g/kg or Pseudomonas fluorescens @ 10 g/kg seed.
- Spray Pseudomonas fluorescens @ 2.5 kg/ha or Tricyclazole 75% WP @ 500 g/ha upon first appearance of leaf spots.

4. SRI (System of Rice Intensification) Water Management:
Alternate Wetting and Drying (AWD) saves up to 30% irrigation water and restricts root rot and anaerobic methane production. Water field up to 2.5 cm depth and irrigate again only after hairline soil cracks appear.
"""
    },
    {
        "title": "ICAR-IIHR Tomato Cultivation, Disease & Pest Management Guide",
        "category": "Horticulture",
        "crop": "Tomato",
        "topic": "Pest & Disease Management",
        "source": "ICAR-Indian Institute of Horticultural Research (IIHR), Bengaluru",
        "filename": "icar_iihr_tomato_guide.txt",
        "content": """
CHAPTER 1: TOMATO PRODUCTION & PLANT PROTECTION

1. Tomato Fruit Borer (Helicoverpa armigera):
Caterpillars bore circular holes into unripe and ripe fruits and feed internally with their posterior body protruding outside.
Eco-friendly Management:
- Plant African Marigold (Tagetes erecta) as a trap crop: 1 row of marigold for every 16 rows of tomato to attract ovipositing moths.
- Install Helicoverpa armigera sex pheromone traps @ 12 traps/ha.
- Release Trichogramma pretiosum @ 50,000/ha weekly, beginning 45 days after transplanting.
- Spray HaNPV (Helicoverpa Nuclear Polyhedrosis Virus) @ 250 LE/ha mixed with 1% jaggery in evening hours.

2. Early Blight (Alternaria solani) & Late Blight (Phytophthora infestans):
Early blight manifests as concentric target-board brown rings on lower leaves, whereas late blight causes dark water-soaked necrotic lesions on leaves and decaying firm brown lesions on fruits during cool, humid weather.
Management:
- Soil drenching and seedling dip with Trichoderma harzianum @ 5 g/L.
- Prune lower older leaves touching the soil surface to break fungal splash dispersal.
- For organic management: Spray 10% cow urine extract with ginger-garlic paste or Bordeaux mixture 1%.
- Chemical defense: Mancozeb 75% WP @ 2 g/L or Copper Oxychloride 50% WP @ 2.5 g/L. Observe strict Pre-Harvest Interval (PHI) of 7 days before harvesting edible fruits.

3. Drip Irrigation and Fertigation:
Provide 2-3 liters of water per plant per day through inline drip emitters. Split N-P-K (19:19:19) fertigation weekly to prevent blossom end rot (which is caused by calcium deficiency aggravated by erratic irrigation).
"""
    },
    {
        "title": "ICAR-CICR Cotton Integrated Pest Management and Agronomy Handbook",
        "category": "Fiber Crops",
        "crop": "Cotton",
        "topic": "Integrated Pest Management",
        "source": "ICAR-Central Institute for Cotton Research (CICR), Nagpur",
        "filename": "icar_cicr_cotton_handbook.txt",
        "content": """
CHAPTER 1: COTTON INTEGRATED PEST MANAGEMENT

1. Pink Bollworm (Pectinophora gossypiella):
Larvae bore into tender squares and bolls, causing rosette flower appearance and stained lint inside locked boll segments.
IPM Strategies:
- Grow non-Bt refugia lines (minimum 5-20% border rows) to delay pest resistance buildup.
- Mass trapping with Pink bollworm pheromone traps (Gossyplure) @ 20 traps/ha.
- Release egg-larval parasitoid Chelonus blackburni @ 10,000/ha.
- Install light traps to monitor moth emergence from diapausing larvae.
- Post-harvest: Terminate crop by mid-January; shred and plow down stalks to eliminate diapausing larvae in stored cotton sticks.

2. Sucking Pest Complex (Thrips, Jassids, Whiteflies):
Symptoms: Leaves curl upward (thrips) or downward (aphids), with yellow margins (jassids). Whiteflies transmit Cotton Leaf Curl Virus (CLCuV).
Management:
- Install yellow sticky traps for whiteflies and blue sticky traps for thrips @ 25 traps/ha.
- Spray Neem Seed Kernel Extract (NSKE 5%) or 3% Neem oil.
- Conserve natural predators: Ladybird beetles (Coccinella septempunctata) and green lacewing (Chrysoperla carnea).
"""
    },
    {
        "title": "ICAR-DGR Groundnut Production & Disease Management Manual",
        "category": "Oilseeds",
        "crop": "Groundnut",
        "topic": "Cultivation & Disease Management",
        "source": "ICAR-Directorate of Groundnut Research (DGR), Junagadh",
        "filename": "icar_dgr_groundnut_manual.txt",
        "content": """
CHAPTER 1: GROUNDNUT CULTIVATION AND HEALTH MANAGEMENT

1. Tikka Leaf Spot Disease (Cercospora arachidicola & Phaeoisariopsis personata):
Early leaf spot produces circular brown spots with distinct bright yellow halos; late leaf spot produces smaller, dark brown to black spots without yellow halos on lower leaf surface, resulting in severe defoliation.
Management:
- Seed treatment: Treat 1 kg kernels with Trichoderma viride @ 4 g or Carbendazim 50% WP @ 2 g before sowing.
- Intercropping with Bajra (Pearl Millet) or Redgram in a 4:1 ratio significantly curbs disease intensity.
- Foliar spray: Spray Mancozeb @ 1 kg/ha or Chlorothalonil 75% WP @ 1 kg/ha at 35 and 50 DAS.

2. Gypsum Application for Pod Filling:
Apply Gypsum @ 400 kg/ha at 40-45 days after sowing (peak pegging stage). Work gypsum gently into soil around root zone. Gypsum provides essential Calcium (19%) and Sulphur (16%), preventing "pops" (empty pods) and increasing shelling percentage.

3. Irrigation Critical Stages:
Critical moisture stages are: Flowering (20-25 DAS), Peg penetration (35-45 DAS), and Pod formation (50-65 DAS). Avoid water stagnation at harvest.
"""
    },
    {
        "title": "ICAR-CPRI Potato Production, Blight Control & Storage Manual",
        "category": "Tuber Crops",
        "crop": "Potato",
        "topic": "Disease Control & Post-Harvest",
        "source": "ICAR-Central Potato Research Institute (CPRI), Shimla",
        "filename": "icar_cpri_potato_manual.txt",
        "content": """
CHAPTER 1: POTATO PRODUCTION & LATE BLIGHT DEFENSE

1. Late Blight of Potato (Phytophthora infestans):
One of the most catastrophic plant diseases in history. Water-soaked pale green spots develop at leaf margins, turning purplish brown and rapidly blackening with white mildew under moist morning canopy conditions.
Control and Resistance:
- Use certified disease-free tubers of tolerant varieties (e.g., Kufri Girdhari, Kufri Himalini, Kufri Jyoti).
- Seed treatment with Trichoderma viride @ 5 g/L water or Mancozeb dip @ 2.5 g/L for 10 minutes; shade dry before planting.
- Preventive spray with Mancozeb 75% WP @ 2.5 g/L as soon as temperature drops below 20°C and relative humidity exceeds 85%.
- If infection appears: Spray Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L or Dimethomorph 50% WP @ 1 g/L.

2. Earthing Up and Cultural Practices:
Perform earthing up 30-35 days after planting to prevent tuber greening (solanine toxicity) and protect tubers from potato tuber moth (Phthorimaea operculella) oviposition.
"""
    },
    {
        "title": "TNAU Spices Guide: Chilli Pest, Thrips & Anthracnose Management",
        "category": "Spices & Vegetables",
        "crop": "Chilli",
        "topic": "Pest & Disease Management",
        "source": "TNAU Department of Spices & Plantation Crops, Coimbatore",
        "filename": "tnau_chilli_spices_guide.txt",
        "content": """
CHAPTER 1: CHILLI PLANT PROTECTION

1. Chilli Murda Complex (Thrips - Scirtothrips dorsalis & Yellow Mite - Polyphagotarsonemus latus):
Thrips feed on upper leaf surfaces causing upward boat-like leaf curling and bronzing. Yellow mites feed on lower leaf surfaces causing downward curling, inverted cup appearance, petiole elongation ('rat tail' symptom).
Integrated Management:
- Grow barrier crops like Maize or Sorghum around chilli plots (4 border rows).
- Install yellow sticky traps for thrips and whiteflies @ 15-20 traps/ha.
- Organic spray: 5% Neem seed kernel extract (NSKE) or Agniastra herbal leaf formulation.
- For severe mite infestation: Spray Wettable Sulphur 80% WP @ 3 g/L or Spiromesifen 22.9% SC @ 1 ml/L.

2. Anthracnose / Fruit Rot / Die-Back (Colletotrichum capsici):
Fungus causes die-back of young branches starting from tip downward, followed by circular sunken spots with black concentric rings of acervuli on ripe fruits.
Management:
- Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed.
- Spray Copper Oxychloride 50% WP @ 2.5 g/L or Azoxystrobin 23% SC @ 1 ml/L at flowering and fruit formation stages.
"""
    },
    {
        "title": "ICAR-NRCB Banana Cultivation, Wilt Control & Precision Farming",
        "category": "Horticulture",
        "crop": "Banana",
        "topic": "Cultivation & Disease Management",
        "source": "ICAR-National Research Centre for Banana (NRCB), Tiruchirappalli",
        "filename": "icar_nrcb_banana_guide.txt",
        "content": """
CHAPTER 1: BANANA INTEGRATED CROP HUSBANDRY

1. Panama Wilt (Fusarium oxysporum f. sp. cubense - Tropical Race 4 & Race 1):
Soil-borne fungal pathogen causing yellowing of lower leaf blades, collapse of leaves at petiole juncture ('skirt' hanging), and internal vascular reddish-brown discoloration.
Management:
- Plant disease-free tissue culture plantlets of resistant/tolerant cultivars (Grand Naine, Poovan).
- Paring and pralinage of suckers: Pare roots and dip rhizome in mud slurry containing Trichoderma viride @ 20 g/sucker + Pseudomonas fluorescens @ 20 g/sucker before planting.
- Apply bio-agent enriched Farmyard Manure (FYM): 10 kg FYM + 50 g Trichoderma harzianum per plant at 2nd and 4th month.
- Avoid flood irrigation in affected orchards; adopt drip irrigation to curb water-mediated spore dissemination.

2. Banana Bunchy Top Virus (BBTV):
Transmitted by banana aphid (Pentalonia nigronervosa). Leaves become upright, crowded at the apex like a bunch, with dark green 'dot-dash' streaks along secondary leaf veins.
Management:
- Eradicate infected plants immediately by pouring 5 ml kerosene or 2,4-D into the pseudostem.
- Control aphid vector using Dimethoate 30% EC @ 1.5 ml/L or Neem oil 3% spray on leaf axils.
"""
    }
]

def seed_knowledge_base(db: Session):
    """Seed authentic agricultural manuals into database if not already present."""
    count = db.query(Document).count()
    if count > 0:
        return

    print("[SEED] Seeding authentic ICAR/TNAU agricultural reference manuals...")
    for doc_info in SEED_DOCUMENTS:
        doc = Document(
            title=doc_info["title"],
            category=doc_info["category"],
            crop=doc_info["crop"],
            topic=doc_info["topic"],
            source=doc_info["source"],
            filename=doc_info["filename"],
            file_type="txt",
            file_size_kb=round(len(doc_info["content"]) / 1024, 2),
            is_seed=True,
            status="Indexed"
        )
        db.add(doc)
        db.flush()

        # Chunk content
        chunks = DocumentProcessor.chunk_text(
            text=doc_info["content"],
            chunk_size=550,
            chunk_overlap=100,
            crop=doc_info["crop"],
            topic=doc_info["topic"]
        )

        doc.chunk_count = len(chunks)
        for idx, chunk_data in enumerate(chunks):
            chunk = DocumentChunk(
                document_id=doc.id,
                chunk_index=idx,
                content=chunk_data["content"],
                crop=chunk_data["crop"],
                topic=chunk_data["topic"],
                section_name=chunk_data["section_name"],
                token_count=chunk_data["token_count"]
            )
            db.add(chunk)

    db.commit()
    print(f"[OK] Successfully seeded {len(SEED_DOCUMENTS)} trusted agricultural reference documents.")
