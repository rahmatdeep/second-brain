import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

interface ContentItem {
  type: "youtube" | "twitter";
  link: string;
  title: string;
}

interface ContentsContextType {
  contents: ContentItem[];
  fetchContents: () => void;
}

const contentsContext = createContext<ContentsContextType | undefined>(
  undefined,
);

export const ContentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contents, setContents] = useState<ContentItem[]>([]);

  const fetchContents = () => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <contentsContext.Provider value={{ contents, fetchContents }}>
      {children}
    </contentsContext.Provider>
  );
};

export const useContents = (): ContentsContextType => {
  const context = useContext(contentsContext);
  if (!context) {
    throw new Error("useContents must be used within a ContentsProvider");
  }
  return context;
};
