const AdminStatsCard = ({ title, value, icon }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <span className="text-3xl mr-4">{icon}</span>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminStatsCard;