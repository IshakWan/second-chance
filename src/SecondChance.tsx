
// SecondChance.tsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchIcon, UploadIcon, Leaf } from "lucide-react";

const userCategories = [
  "Antiquitäten",
  "Möbel",
  "Schmuck",
  "Uhren",
  "Elektronik & Werkzeuge",
  "Kleidung",
  "Unsortiert & spannend",
  "Sammlerstücke"
];

const defaultWhatsAppLink = "https://wa.me/4917612345678";

const mockItems = [
  {
    id: 1,
    title: "Vintage Waschmaschine",
    category: "Elektronik & Werkzeuge",
    price: "120€",
    image: "/sample-washer.jpg",
    description: "Gut erhaltene Waschmaschine aus den 90ern",
    contact: defaultWhatsAppLink
  },
];

export default function SecondChance() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredItems, setFilteredItems] = useState(mockItems);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(userCategories[0]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const isAdmin = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("admin") === "1234";

  useEffect(() => {
    let items = mockItems;
    if (search) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory);
    }
    setFilteredItems(items);
  }, [search, selectedCategory]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFiles.length) return alert("Bitte mindestens ein Bild auswählen");
    console.log("Produkt hochladen:", {
      title,
      category,
      price,
      location,
      description,
      imageFiles
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="p-6 max-w-4xl mx-auto bg-green-50 min-h-screen">
        <h1 className="text-4xl font-bold leading-tight mb-1 text-green-800 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          Second Chance <span className="text-sm text-green-500 ml-1">for you</span>
        </h1>
        <p className="mb-6 text-green-700">Finde Schmuck, gebrauchte Möbel, Geräte und mehr – günstig & lokal!</p>
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Was suchst du? z.B. Waschmaschine, Sofa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-green-400 focus:ring-green-500"
          />
          <SearchIcon className="w-5 h-5 text-green-700" />
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {userCategories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={selectedCategory === cat ? "bg-green-700 text-white" : "border-green-500 text-green-700"}
              onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border-green-200">
              <CardContent className="p-4">
                <img src={item.image} alt={item.title} className="rounded-xl mb-2 w-full h-40 object-cover" />
                <h2 className="text-lg font-semibold text-green-800">{item.title}</h2>
                <p className="text-sm text-green-600">{item.category}</p>
                <p className="mt-1 font-medium text-green-900">{item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {isAdmin && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Produkt hochladen</h2>
            <form onSubmit={handleUpload} className="grid gap-3">
              <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
              <div className="flex flex-wrap gap-2">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Vorschau ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md border border-green-300"
                  />
                ))}
              </div>
              <Input placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
              <select className="border rounded-md p-2 border-green-400" value={category} onChange={(e) => setCategory(e.target.value)}>
                {userCategories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <Input placeholder="Preis" value={price} onChange={(e) => setPrice(e.target.value)} />
              <Input placeholder="Standort" value={location} onChange={(e) => setLocation(e.target.value)} />
              <Input placeholder="Beschreibung" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                <UploadIcon className="w-4 h-4 mr-2" /> Hochladen
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
