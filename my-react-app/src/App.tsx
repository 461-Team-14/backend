import React, { useState } from 'react';
import JSZip from 'jszip';

const App: React.FC = () => {
  const [hasPackageJson, setHasPackageJson] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const zip = await JSZip.loadAsync(file);

    if (zip.file('package.json')) {
      setHasPackageJson(true);
    } else {
      setHasPackageJson(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {hasPackageJson && <p>This zip file contains a package.json file.</p>}
    </div>
  );
};

export default App;
