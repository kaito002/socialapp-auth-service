module.exports = {
    collectCoverage: true,
    coverageReporters: ['lcov','text','text-summary','html'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!test/**/*'
    ],
    preset: 'ts-jest',
    roots: ['./test'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    }
}
