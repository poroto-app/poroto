import { getFileExtension } from "src/domain/util/file";

describe("getFileExtension", () => {
    const cases: {
        name: string;
        fileName: string;
        expected: string | null;
    }[] = [
        {
            name: "no extension",
            fileName: "file",
            expected: null,
        },
        {
            name: "one extension",
            fileName: "file.txt",
            expected: "txt",
        },
        {
            name: "two extensions",
            fileName: "file.tar.gz",
            expected: "gz",
        },
        {
            name: "with file path",
            fileName: "path/to/file.txt",
            expected: "txt",
        },
    ];

    cases.forEach((c) =>
        test(c.name, () => {
            const actual = getFileExtension(c.fileName);
            expect(actual).toEqual(c.expected);
        })
    );
});
