/* ---------- PHOTO PROMPT PACK ---------- */
const KEEP='Keep EVERYTHING else exactly the same as the attached photo: the same woman, face, expression, hair, skin tone, body, pose, hand positions, camera angle, framing, crop, lighting and plain background, and the same image size. Do not move, resize or re-pose her. Photorealistic, no text, no watermark.';
const EDIT_PACK=[
 // bottoms: replace only the beige trousers
 ['bottom','b-jeans-blue','Blue straight jeans','classic mid-blue straight-leg jeans'],
 ['bottom','b-jeans-black','Black slim jeans','black slim-fit jeans'],
 ['bottom','b-trousers-black','Black tailored trousers','black high-waist tailored trousers with a pressed centre crease'],
 ['bottom','b-wide-white','White wide-leg trousers','white high-waist wide-leg linen trousers'],
 ['bottom','b-palazzo-print','Block-print palazzo','flowing ivory palazzo pants with a small indigo hand block print'],
 ['bottom','b-skirt-pleated','Pleated midi skirt','a mocha-brown pleated midi skirt that ends at mid-calf'],
 ['bottom','b-skirt-pencil','Pencil skirt','a black knee-length pencil skirt'],
 ['bottom','b-skirt-maxi','Tiered maxi skirt','a rust-orange tiered cotton maxi skirt that reaches the ankle'],
 ['bottom','b-cargo-olive','Olive cargo trousers','relaxed olive-green cargo trousers'],
 ['bottom','b-denim-skirt','Denim midi skirt','a mid-blue denim midi skirt'],
 // tops: replace only the ivory t-shirt
 ['top','t-shirt-white','White shirt','a crisp white cotton button-down shirt tucked into the trousers, sleeves rolled to the elbow'],
 ['top','t-tee-black','Black t-shirt','a fitted black crew-neck t-shirt tucked into the trousers'],
 ['top','t-tee-stripe','Striped t-shirt','a navy-and-white Breton striped t-shirt tucked into the trousers'],
 ['top','t-blouse-silk','Silk blouse','a blush-pink long-sleeve silk blouse tucked into the trousers'],
 ['top','t-knit-cream','Ribbed knit top','a fitted cream ribbed long-sleeve knit top tucked into the trousers'],
 ['top','t-cami-satin','Satin camisole','a champagne satin camisole with thin straps tucked into the trousers'],
 ['top','t-offshoulder','Off-shoulder top','a white ruffled off-shoulder top tucked into the trousers'],
 ['top','t-blazer-camel','Camel blazer (over tee)','a camel single-breasted blazer worn open over the same ivory t-shirt'],
 ['top','t-denim-jacket','Denim jacket (over tee)','a light-wash denim jacket worn open over the same ivory t-shirt'],
 ['top','t-kurti-magenta','Short kurti (over trousers)','a short magenta cotton block-print kurti with elbow sleeves that ends at mid-thigh, worn over the same trousers'],
 // shoes: replace only the white sneakers
 ['shoes','s-pumps-black','Black pumps','black pointed-toe leather pumps'],
 ['shoes','s-pumps-nude','Nude pumps','nude-beige pointed-toe pumps'],
 ['shoes','s-juttis-gold','Gold juttis','gold embroidered Punjabi juttis'],
 ['shoes','s-kolhapuri','Kolhapuris','tan leather Kolhapuri sandals'],
 ['shoes','s-boots-black','Ankle boots','black leather ankle boots'],
 ['shoes','s-loafers-brown','Loafers','brown leather penny loafers'],
 ['shoes','s-strappy-gold','Gold strappy heels','gold strappy heeled sandals'],
 // jewellery: add only
 ['jewellery','j-jhumka-gold','Gold jhumkas','a pair of medium gold jhumka earrings'],
 ['jewellery','j-kundan','Kundan choker set','a kundan choker necklace with matching kundan earrings'],
 ['jewellery','j-pearl','Pearl set','a single-strand pearl necklace and pearl stud earrings'],
 ['jewellery','j-hoops-gold','Gold hoops','a pair of medium gold hoop earrings'],
 ['jewellery','j-oxidised','Oxidised jhumkas','a pair of oxidised silver jhumka earrings'],
 ['jewellery','j-temple','Temple necklace','a long antique-gold temple necklace with matching earrings'],
 ['jewellery','j-chain','Fine gold chain','a delicate gold chain necklace with a small pendant'],
 ['jewellery','j-statement','Statement earrings','bold geometric gold statement earrings'],
 // bags: add only
 ['bag','g-clutch-black','Black clutch','a small black satin clutch held in the hand on the right side of the image'],
 ['bag','g-potli-gold','Gold potli','a gold embroidered potli bag hanging from the hand on the right side of the image'],
 ['bag','g-tote-tan','Tan tote','a structured tan leather tote bag hanging from the forearm on the right side of the image'],
 ['bag','g-crossbody-brown','Crossbody bag','a small brown leather crossbody bag worn across the body, resting on the hip on the right side of the image'],
 ['bag','g-mini-red','Red mini bag','a small red top-handle mini bag held in the hand on the right side of the image']
].map(([cat,id,name,desc])=>({cat,id,name,desc,prompt:
  cat==='bottom'?`Edit the attached photo. Replace ONLY the beige trousers with ${desc}. Keep the ivory t-shirt and white sneakers unchanged. ${KEEP}`:
  cat==='top'?`Edit the attached photo. Replace ONLY the ivory t-shirt with ${desc}. Keep the beige trousers and white sneakers unchanged. ${KEEP}`:
  cat==='shoes'?`Edit the attached photo. Replace ONLY the white sneakers with ${desc}. Keep the outfit unchanged. ${KEEP}`:
  cat==='jewellery'?`Edit the attached photo. ADD ONLY ${desc} to the woman; remove the small stud earrings if they would clash. Do not change the outfit. ${KEEP}`:
  `Edit the attached photo. ADD ONLY ${desc}. Do not change the outfit. ${KEEP}`}));
const PACK_CATS=[['top','Tops'],['bottom','Bottoms'],['shoes','Shoes & sandals'],['bag','Bags'],['jewellery','Jewellery sets'],['earrings','Earrings'],['necklace','Necklaces'],['wrist','Bangles & watches'],['rings','Rings'],['head','Caps & hats'],['eyewear','Sunglasses'],['belt','Belts'],['scarf','Scarves & layers']];
/* ---------- PACK 2: more accessories ---------- */
const PACK2_RAW=[
 // bags (held or worn on the RIGHT side of the image so they never clash with wrist pieces on the left)
 ['bag','g-sling-black','Black sling bag','a small black leather sling bag on a thin strap worn across the body, resting on the hip on the right side of the image'],
 ['bag','g-sling-tan','Tan sling bag','a tan leather sling bag with a gold buckle, strap across the body, resting on the hip on the right side of the image'],
 ['bag','g-sling-quilted','Quilted chain sling','a cream quilted sling bag on a gold chain strap worn across the body, resting on the hip on the right side of the image'],
 ['bag','g-backpack-black','Black backpack','a black minimalist leather backpack worn on both shoulders (straps visible over the shoulders)'],
 ['bag','g-backpack-canvas','Canvas backpack','a beige canvas backpack worn on one shoulder on the right side of the image'],
 ['bag','g-clutch-gold','Gold clutch','a gold metallic box clutch held in the hand on the right side of the image'],
 ['bag','g-clutch-embroidered','Embroidered clutch','a maroon velvet clutch with gold zardozi embroidery held in the hand on the right side of the image'],
 ['bag','g-clutch-pearl','Pearl clutch','an ivory pearl-beaded clutch held in the hand on the right side of the image'],
 ['bag','g-bucket','Bucket bag','a camel suede bucket bag with a drawstring hanging from the hand on the right side of the image'],
 ['bag','g-hobo','Hobo shoulder bag','a slouchy black leather hobo bag on the shoulder on the right side of the image'],
 ['bag','g-beltbag','Belt bag','a black nylon belt bag worn across the chest'],
 ['bag','g-laptop','Laptop tote','a large structured navy laptop tote bag hanging from the forearm on the right side of the image'],
 // shoes
 ['shoes','s-sandals-flat','Flat tan sandals','flat tan leather strappy sandals'],
 ['shoes','s-wedges','Wedge sandals','jute wedge sandals with beige straps'],
 ['shoes','s-block-heels','Block heels','black suede block-heel sandals'],
 ['shoes','s-ballet','Ballet flats','black leather ballet flats'],
 ['shoes','s-mules','Mules','beige pointed-toe slip-on mules'],
 ['shoes','s-sneakers-black','Black sneakers','black low-top leather sneakers'],
 ['shoes','s-chunky','Chunky sneakers','white and grey chunky dad sneakers'],
 ['shoes','s-gladiator','Gladiator sandals','tan flat gladiator sandals'],
 ['shoes','s-slides','Slides','black flat slide sandals'],
 ['shoes','s-heeled-juttis','Heeled juttis','gold embroidered juttis with a small block heel'],
 // earrings
 ['earrings','e-studs-diamond','Diamond studs','small diamond stud earrings'],
 ['earrings','e-chandbali','Chandbalis','gold kundan chandbali earrings'],
 ['earrings','e-drop-pearl','Pearl drops','long pearl drop earrings'],
 ['earrings','e-silver-jhumka','Silver jhumkas','large oxidised silver jhumka earrings with small bells'],
 ['earrings','e-tassel','Tassel earrings','colourful silk tassel earrings'],
 ['earrings','e-huggies','Gold huggies','small chunky gold huggie hoop earrings'],
 // necklaces
 ['necklace','n-layered','Layered chains','three layered fine gold chains of different lengths'],
 ['necklace','n-choker-velvet','Velvet choker','a thin black velvet choker'],
 ['necklace','n-mangalsutra','Mangalsutra','a modern short gold and black-bead mangalsutra pendant necklace'],
 ['necklace','n-polki','Polki necklace','a polki diamond necklace with emerald drops'],
 ['necklace','n-statement','Statement bib','a chunky gold statement bib necklace'],
 ['necklace','n-locket','Locket','a long gold chain with a round locket pendant'],
 // wrist (on the LEFT side of the image)
 ['wrist','w-bangles-gold','Gold bangles','a stack of six thin gold bangles'],
 ['wrist','w-bangles-glass','Glass bangles','a stack of red and green glass bangles'],
 ['wrist','w-kada','Gold kada','one wide carved gold kada bracelet'],
 ['wrist','w-cuff-silver','Silver cuff','a wide oxidised silver cuff bracelet'],
 ['wrist','w-charm','Charm bracelet','a delicate gold charm bracelet'],
 ['wrist','w-beaded','Beaded bracelets','a stack of colourful beaded bracelets'],
 ['wrist','w-watch-gold','Gold watch','a classic gold watch with a small round dial'],
 ['wrist','w-smartwatch','Smartwatch','a black smartwatch with a sport band'],
 // rings (left hand)
 ['rings','r-cocktail','Cocktail ring','one large emerald cocktail ring on the index finger'],
 ['rings','r-stack','Stacked rings','several thin stacked gold rings on two fingers'],
 ['rings','r-silver','Silver rings','a few chunky oxidised silver rings'],
 // head
 ['head','h-cap-white','White cap','a plain white baseball cap'],
 ['head','h-cap-black','Black cap','a plain black baseball cap'],
 ['head','h-bucket','Bucket hat','a beige cotton bucket hat'],
 ['head','h-sunhat','Sun hat','a wide-brim natural straw sun hat'],
 ['head','h-fedora','Fedora','a camel wool fedora hat'],
 ['head','h-beanie','Beanie','a cream knitted beanie'],
 ['head','h-headband','Padded headband','a padded black velvet headband'],
 ['head','h-maangtikka','Maang tikka','a gold kundan maang tikka on her hair parting'],
 // eyewear
 ['eyewear','y-aviator','Aviators','gold-frame aviator sunglasses'],
 ['eyewear','y-cateye','Cat-eye sunglasses','black cat-eye sunglasses'],
 ['eyewear','y-round','Round sunglasses','round tortoiseshell sunglasses'],
 ['eyewear','y-oversized','Oversized sunglasses','oversized black square sunglasses'],
 ['eyewear','y-clear','Clear glasses','thin gold-rim clear prescription glasses'],
 // belts
 ['belt','l-brown','Brown belt','a slim brown leather belt with a gold buckle through the trouser belt loops'],
 ['belt','l-black','Black belt','a black leather belt with a silver buckle through the trouser belt loops'],
 ['belt','l-chain','Chain belt','a gold chain belt worn at the waist'],
 ['belt','l-kamarbandh','Kamarbandh','a gold kundan kamarbandh waist belt'],
 // scarves & stoles
 ['scarf','f-silk','Silk scarf','a printed silk scarf tied loosely around the neck'],
 ['scarf','f-pashmina','Pashmina stole','a soft grey pashmina stole draped over both shoulders'],
 ['scarf','f-bandhani','Bandhani dupatta','a red bandhani dupatta draped over one shoulder on the left side of the image'],
 ['scarf','f-shrug','Long shrug','a long open cream crochet shrug over the t-shirt'],
 // alternates you generated
 ['bag','g-backpack-beige','Beige shoulder backpack','a beige backpack worn over one shoulder on the right side of the image'],
 ['bag','g-clutch-pearl2','Pearl clutch (in hand)','an ivory pearl clutch held in the hand on the right side of the image'],
 ['bag','g-laptop2','Navy tote (other arm)','a structured navy tote bag on the arm on the left side of the image'],
 ['wrist','w-smartwatch-sport','Sport smartwatch','a black sport smartwatch']
];
const CAT_RULE={
 bag:'Do not change the outfit.',
 shoes:'',
 earrings:'Remove the small stud earrings she is wearing. Do not change her hair.',
 necklace:'Wear it around her neck over the t-shirt. Do not change the t-shirt.',
 wrist:'Put it on her wrist on the LEFT side of the image only. Keep both hands exactly where they are.',
 rings:'Put them on the fingers of the hand on the LEFT side of the image only. Keep both hands exactly where they are.',
 head:'Keep her face, hair length and hairstyle otherwise unchanged.',
 eyewear:'Keep her face and expression unchanged.',
 belt:'Keep the t-shirt tucked in. Do not change the trousers.',
 scarf:'Do not change the outfit underneath.'
};
const PACK2=PACK2_RAW.map(([cat,id,name,desc])=>({cat,id,name,desc,prompt:
 cat==='shoes'?`Edit the attached photo. Replace ONLY the white sneakers with ${desc}. Keep the outfit unchanged. ${KEEP}`:
 `Edit the attached photo. ADD ONLY ${desc}. ${CAT_RULE[cat]} ${KEEP}`}));

const ALL_PACK=EDIT_PACK.concat(PACK2);
