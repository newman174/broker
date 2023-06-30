import { useMemo } from "react";
import { CircleCheck, XboxX } from "tabler-icons-react";

import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
const Matrix = ({ comparisons }) => {
  console.log("comparisons", comparisons);

  const records = useMemo(() => {
    const records = [];

    for (const { status, consumerContract, providerSpec } of comparisons) {
      for (const {
        version: consumerVersion,
        participantBranch: consumerBranch,
      } of consumerContract.consumerVersions) {
        for (const {
          version: providerVersion,
          participantBranch: providerBranch,
        } of providerSpec.providerVersions) {
          records.push({
            consumerVersion,
            consumerBranch,
            providerVersion,
            providerBranch,
            status,
          });
        }
      }
    }

    return records;
  }, [comparisons]);

  const columns = useMemo(
    () => [
      {
        id: "consumer",
        header: "Consumer",
        columns: [
          {
            accessorKey: "consumerVersion", //access nested data with dot notation
            header: "Consumer Version",
            filterVariant: "multi-select",
            enableClickToCopy: true,
          },

          {
            accessorKey: "consumerBranch",
            header: "Consumer Branch",
            filterVariant: "multi-select",
          },
        ],
      },
      {
        id: "provider",
        header: "Provider",
        columns: [
          {
            accessorKey: "providerVersion", //normal accessorKey
            header: "Provider Version",
            filterVariant: "multi-select",
            enableClickToCopy: true,
          },

          {
            accessorKey: "providerBranch",
            header: "Provider Branch",
            filterVariant: "multi-select",
          },
        ],
      },
      {
        id: "status",
        header: "",
        columns: [
          {
            accessorKey: "status",
            header: "Status",
            filterVariant: "multi-select",
            Cell: ({ cell }) =>
              cell.getValue() === "Success" ? (
                <CircleCheck color={"#4caf50"} />
              ) : (
                <XboxX color={"#f44336"} />
              ),
          },
        ],
      },
    ],

    []
  );

  const table = useMantineReactTable({
    columns,
    data: records,
    enableFacetedValues: true,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
  });

  return <MantineReactTable table={table} />;
};
export default Matrix;
