# Bestore Car - Prompts de génération d'images (Nano Banana / Gemini 2.5 Flash Image)

But : compléter la flotte avec des visuels **identiques au style déjà en place**
(rendus type configurateur constructeur, studio blanc).

---

## 1. Le style de référence (analysé depuis les images existantes)

Les 8 voitures déjà faites (Yaris, Clio 5, Sandero, 208, Octavia, T-Roc, i20, Sportage)
partagent exactement ceci :

| Élément | Valeur |
|---|---|
| Décor | Cyclorama studio sans raccord, mur blanc cassé / sol gris clair, ligne d'horizon visible derrière la voiture |
| Éclairage | Softbox large diffuse, aucune ombre dure, reflets doux allongés sur la carrosserie |
| Ombre | Ombre de contact très douce sous les roues uniquement |
| Objectif | ~50 mm, hauteur caméra ≈ hauteur du rétroviseur, zéro distorsion |
| Cadrage | Voiture centrée, marge d'air égale à gauche/droite, ~10 % de vide en haut |
| Format | 16:9, 1366 × 768 px |
| Extras | Roues droites, vitres teintées légères, plaque blanche vierge ou nom du modèle |
| Interdits | Personnes, texte marketing, logo d'agence, décor extérieur, matériel de studio visible |

⚠️ **Attention aux noms de dossiers**, ils sont trompeurs :

| Dossier | Angle réel |
|---|---|
| `assets/images/cars/` | **3/4 avant gauche** |
| `assets/images/34/` | **3/4 arrière droit** |
| `assets/images/side view/` | **profil strict** |

---

## 2. La méthode qui marche (important)

Nano Banana est **un modèle d'édition**, pas seulement de génération. La cohérence
vient des images de référence, pas du texte.

1. Va sur **aistudio.google.com** (gratuit) → modèle *Gemini 2.5 Flash Image*.
2. **Joins 2 images à chaque prompt :**
   - une image existante du **même angle** (ex. `cars/troc.png` pour un 3/4 avant) → donne le studio, la lumière, le cadrage ;
   - une photo réelle de la voiture cible (site constructeur) → donne la carrosserie exacte.
3. Colle le prompt de l'angle ci-dessous.
4. Fais les **3 angles d'une même voiture dans le même chat** → le modèle garde la couleur et les jantes.
5. Export PNG → convertir en `.webp` (commande en bas).

Sans image de référence, le modèle inventera un modèle de voiture approximatif.

---

## 3. Les 3 prompts d'angle (templates)

Remplace `{VOITURE}` et `{COULEUR}`. Écrire en anglais donne de meilleurs résultats.

### A - 3/4 AVANT GAUCHE → `assets/images/cars/{slug}.webp`

```
Using the first image as the exact studio, lighting and framing reference, and the
second image as the exact vehicle reference, generate a manufacturer-configurator
studio render of a {COULEUR} {VOITURE}.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at
side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible
horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long
soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in
frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence
plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor
scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

### B - 3/4 ARRIÈRE DROIT → `assets/images/34/{slug}.webp`

```
Same car, same colour, same wheels and same studio as the previous image - only the
camera moves.

Camera: rear three-quarter view from the rear-right, lens ~50mm, camera height at
side-mirror level, level horizon, no distortion.
Set: identical seamless studio cyclorama, off-white back wall, light grey floor,
visible horizon line, soft corner shading on the back wall.
Lighting: identical large diffused softbox, no hard shadows.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in
frame, 16:9 aspect ratio.
Details: rear lights visible and lit a soft red, boot closed, plain white licence
plate showing only the model name, wheels straight.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

### C - PROFIL STRICT → `assets/images/side view/{slug}.webp`

```
Same car, same colour, same wheels and same studio as the previous images - only the
camera moves.

Camera: perfect 90-degree side profile from the left, lens ~50mm, camera exactly at
door-handle height, absolutely no perspective distortion - both wheels identical in
size, the car reads as a flat orthographic silhouette.
Set: identical studio, upper half off-white wall, lower half light grey floor, a
clean straight horizon line behind the car.
Lighting: identical soft even diffusion across the whole flank, no hot spots.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred and horizontal, equal air in front and behind, ~15%
headroom, full vehicle in frame, 16:9 aspect ratio.
Details: front wheel straight, doors closed, lightly tinted windows.
Do not include: people, text, watermarks, outdoor scenery, studio equipment.
Photorealistic, ultra sharp, 1366x768.
```

---

## 4. Liste des voitures à faire

### 4.1 - Il manque **les 3 angles** (16 voitures)

| ref_id | Voiture | `{VOITURE}` à mettre dans le prompt | `{COULEUR}` conseillée | slug fichier |
|---|---|---|---|---|
| 20 | Opel Corsa | 2023 Opel Corsa F hatchback | metallic white | `opel-corsa` |
| 22 | Dacia Logan | 2023 Dacia Logan sedan, third generation | metallic grey | `dacia-logan` |
| 24 | Hyundai Accent 2025 | 2025 Hyundai Accent / Verna sedan | pearl white | `hyundai-accent` |
| 27 | Seat Leon FR | 2023 Seat Leon FR Mk4 hatchback | desire red | `seat-leon` |
| 28 | Cupra Leon 2025 | 2025 Cupra Leon hatchback with copper accents | matte petrol blue | `cupra-leon` |
| 29 | VW Golf 8.5 2026 | 2026 Volkswagen Golf 8.5 hatchback | moonstone grey | `vw-golf-85` |
| 30 | Audi A3 2025 | 2025 Audi A3 Sportback S line | daytona grey | `audi-a3` |
| 31 | Mercedes Classe A | 2023 Mercedes-Benz A-Class hatchback AMG Line | polar white | `mercedes-classe-a` |
| 32 | BMW Série 1 2026 | 2026 BMW 1 Series F70 M Sport | black sapphire | `bmw-serie-1` |
| 33 | Hyundai Tucson | 2024 Hyundai Tucson SUV | amazon grey | `hyundai-tucson` |
| 36 | VW Tiguan 2025 | 2025 Volkswagen Tiguan Mk3 SUV | oyster silver | `vw-tiguan` |
| 37 | Audi Q3 2026 | 2026 Audi Q3 SUV S line | navarra blue | `audi-q3` |
| 39 | Audi RS3 2026 | 2026 Audi RS3 Sportback | nardo grey | `audi-rs3` |
| 40 | Porsche Macan | 2024 Porsche Macan SUV | jet black metallic | `porsche-macan` |
| 41 | Range Rover Sport 2025 | 2025 Range Rover Sport SUV | santorini black | `range-rover-sport` |
| 42 | VW Touareg 2025 | 2025 Volkswagen Touareg SUV | chiffon grey | `vw-touareg` |

### 4.2 - Il manque **le 3/4 arrière + le profil** (5 voitures)

Elles ont déjà le 3/4 avant dans `assets/images/cars/`. **Utilise cette image comme
référence de couleur** et ne lance que les prompts **B** et **C**.

| ref_id | Voiture | image existante | slug à réutiliser |
|---|---|---|---|
| 21 | Hyundai i10 | `cars/i10.webp` | `i10` |
| 26 | Seat Ibiza FR | `cars/seat-ibiza.webp` | `seat-ibiza` |
| 34 / 35 | Dacia Duster | `cars/duster.webp` | `duster` |
| 38 | Cupra Formentor 2025 | `cars/cupra-formentor.webp` | `cupra-formentor` |
| - | VW Golf 8R | `cars/GOLF8R.webp` | `golf-8r` |

### 4.3 - Complètes, ne rien faire

Yaris · Clio 5 · Sandero · 208 · Octavia · T-Roc · i20 · Sportage

---

## 5. Exemple concret, prompt entièrement rempli

*(Audi Q3 - 3/4 avant. Joindre `assets/images/cars/troc.png` + une photo réelle de Q3.)*

```
Using the first image as the exact studio, lighting and framing reference, and the
second image as the exact vehicle reference, generate a manufacturer-configurator
studio render of a navarra blue 2026 Audi Q3 SUV S line.

Camera: front three-quarter view from the front-left, lens ~50mm, camera height at
side-mirror level, perfectly level horizon, no perspective distortion.
Set: seamless studio cyclorama, off-white back wall, light grey floor, soft visible
horizon line behind the car.
Lighting: large diffused softbox from above and front-left, no hard shadows, long
soft highlights running along the bodywork, clean gradient reflection on the hood.
Shadow: very soft contact shadow under the wheels only.
Composition: car centred, equal air left and right, ~10% headroom, full vehicle in
frame, 16:9 aspect ratio.
Details: wheels straight, lightly tinted windows, headlights off, plain white licence
plate, factory alloy wheels, showroom-clean paint.
Do not include: people, text, watermarks, logos other than the car brand, outdoor
scenery, visible studio equipment, motion blur.
Photorealistic, ultra sharp, 1366x768.
```

Puis, dans **le même chat**, enchaîner le prompt B, puis le prompt C.

---

## 6. Après génération

Nommer les fichiers exactement comme la colonne *slug*, puis convertir en webp :

```bash
cd "assets/images/cars" && for f in *.png; do cwebp -q 82 "$f" -o "${f%.png}.webp"; done
```

Enfin, ajouter chaque voiture dans `js/car-images.js` (`CAR_IMAGES` + `NAME_TO_SLUG`)
et renseigner `photo_url` dans `seed.js`.
