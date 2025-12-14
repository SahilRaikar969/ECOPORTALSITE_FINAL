// LCATracker.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS_DATA } from '../PRODUCTS_DATA';

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Icons
import { Leaf, Factory, Truck, Recycle } from 'lucide-react';

/* ---------- Helper for Blockchain Stage Icons ---------- */
const getIconForStage = (stageName: string) => {
  if (stageName.toLowerCase().includes('manufact')) return <Factory />;
  if (stageName.toLowerCase().includes('transport')) return <Truck />;
  if (stageName.toLowerCase().includes('recycl')) return <Recycle />;
  return <Leaf />;
};

const LCATracker: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [activeTab, setActiveTab] = useState<'simulator' | 'market'>('simulator');

  const selectedProduct = PRODUCTS_DATA.find(p => p.id === productId);

  if (!selectedProduct) {
    return (
      <div className="text-center py-20 text-red-600 font-bold">
        Product not found!
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* ---------- Product Info ---------- */}
      <h2 className="text-3xl font-extrabold text-eco-800">
        {selectedProduct.title}
      </h2>

      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
        className="w-full max-w-md mx-auto rounded-xl shadow-lg"
      />

      <p className="text-lg font-semibold text-eco-700">
        Cost: ₹{selectedProduct.cost}
      </p>

      {/* ---------- Tabs ---------- */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`pb-2 font-semibold ${
            activeTab === 'simulator'
              ? 'border-b-2 border-eco-600 text-eco-700'
              : 'text-gray-500'
          }`}
        >
          Simulator
        </button>

        <button
          onClick={() => setActiveTab('market')}
          className={`pb-2 font-semibold ${
            activeTab === 'market'
              ? 'border-b-2 border-eco-600 text-eco-700'
              : 'text-gray-500'
          }`}
        >
          Market Alternatives
        </button>
      </div>

      {/* ================= TAB CONTENT ================= */}

      {/* ---------- SIMULATOR TAB ---------- */}
      {activeTab === 'simulator' && (
        <>
          <div>
            <h3 className="text-xl font-bold text-eco-800 mb-2">Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-eco-700">
              {selectedProduct.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Charts & Savings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-sm font-bold text-center mb-4">
                Lifecycle Impact Analysis (CO₂)
              </h3>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={selectedProduct.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Conventional" fill="#fb7185" />
                  <Bar dataKey="EcoFriendly" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-br from-eco-600 to-sky-700 text-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Leaf />
                <h3 className="font-bold uppercase">Total Savings</h3>
              </div>

              <p className="mb-6 opacity-90">
                {selectedProduct.savings.description}
              </p>

              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-black">
                  {selectedProduct.savings.value}
                </span>
                <span className="text-xl font-bold">
                  {selectedProduct.savings.unit}
                </span>
              </div>

              <p className="italic text-sm opacity-80">
                "{selectedProduct.savings.statement}"
              </p>
            </div>
          </div>

          {/* Lifecycle Stages */}
          <div className="space-y-6">
            {selectedProduct.stages.map((stage, index) => (
              <div
                key={stage.id}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <div className="flex items-center gap-4 mb-3">
                  {getIconForStage(stage.name)}
                  <h4 className="font-bold text-lg">
                    Step {index + 1}: {stage.name}
                  </h4>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-rose-600 font-bold">
                    Conventional: {stage.conventionalValue}
                  </div>
                  <div className="text-eco-600 font-bold">
                    Eco-Friendly: {stage.ecoValue}
                  </div>
                  <div className="text-slate-500">
                    {stage.insight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------- MARKET ALTERNATIVES TAB ---------- */}
      {activeTab === 'market' && (
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
          {selectedProduct.marketAlternatives ? (
            <>
              <h3 className="text-xl font-bold text-eco-800 mb-4">
                Eco-Friendly vs Conventional Comparison
              </h3>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-eco-50 text-left">
                    <th className="p-3">Aspect</th>
                    <th className="p-3 text-rose-600">
                      {selectedProduct.marketAlternatives.conventionalName}
                    </th>
                    <th className="p-3 text-eco-700">
                      {selectedProduct.marketAlternatives.ecoName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.marketAlternatives.comparison.map(
                    (row, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3 font-semibold">{row.aspect}</td>
                        <td className="p-3 text-rose-600">{row.conventional}</td>
                        <td className="p-3 text-eco-700 font-semibold">
                          {row.eco}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-gray-500">
              Market comparison data not available for this product.
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default LCATracker;
