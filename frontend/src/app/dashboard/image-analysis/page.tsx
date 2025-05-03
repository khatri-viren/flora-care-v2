/* eslint-disable @next/next/no-img-element */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

const Devices = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://flora-care-ai-server.fly.dev/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResult(data.predicted_label);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Label>Image Analysis</Label>
      <Input
        type="file"
        className="w-fit"
        onChange={handleImageChange}
        accept="image/*"
      />

      {previewUrl && (
        <div className="flex flex-col gap-2">
          <Label>Preview</Label>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-[300px] rounded-lg border"
          />
        </div>
      )}

      <Button
        className="w-fit"
        size="sm"
        onClick={handleAnalyze}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </Button>

      {result && (
        <div className="flex flex-col gap-2">
          <Label>Result</Label>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Devices;
