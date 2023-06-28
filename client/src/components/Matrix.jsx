import { DataTable } from "mantine-datatable";
const Matrix = ({ comparisons }) => {
  const records = [];
  for (const {
    consumerContract,
    providerContract,
    comparisonStatus,
  } of comparisons) {
    records.push({
      consumerVersion:
        consumerContract.participantVersions[0].participantVersionId,
      consumerBranch: consumerContract.participantVersions[0].participantBranch,
      providerVersion:
        providerContract.participantVersions[0].participantVersionId,
      providerBranch: providerContract.participantVersions[0].providerBranch,
      status: comparisonStatus,
    });
  }
  return (
    <DataTable
      withBorder
      withColumnBorders
      records={records}
      groups={[
        {
          id: "consumer",
          columns: [
            { accessor: "consumerVersion" },
            {
              accessor: "consumerBranch",
            },
          ],
        },
        {
          id: "provider",
          columns: [
            { accessor: "providerVersion" },
            { accessor: "providerBranch" },
          ],
        },
        {
          id: "comparison",
          columns: [{ accessor: "status" }],
        },
      ]}
    />
  );
};
export default Matrix;
