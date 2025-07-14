// 测试生成的 flexible 脚本
const { generateFlexibleScript } = require('../dist/src/plugins');

// 测试不同的配置
const testCases = [
  {
    name: '默认配置',
    options: {},
    expected: {
      baseWidth: 375,
      minFontSize: null,
      maxFontSize: null,
      hasMinLogic: false,
      hasMaxLogic: false
    }
  },
  {
    name: '带边界限制',
    options: {
      minFontSize: 12,
      maxFontSize: 24,
      baseWidth: 750
    },
    expected: {
      baseWidth: 750,
      minFontSize: 12,
      maxFontSize: 24,
      hasMinLogic: true,
      hasMaxLogic: true
    }
  },
  {
    name: '只有最小值',
    options: {
      minFontSize: 14
    },
    expected: {
      baseWidth: 375,
      minFontSize: 14,
      maxFontSize: null,
      hasMinLogic: true,
      hasMaxLogic: false
    }
  },
  {
    name: '只有最大值',
    options: {
      maxFontSize: 20
    },
    expected: {
      baseWidth: 375,
      minFontSize: null,
      maxFontSize: 20,
      hasMinLogic: false,
      hasMaxLogic: true
    }
  }
];

// 模拟文件系统
const fs = require('fs');
const originalWriteFileSync = fs.writeFileSync;
const originalExistsSync = fs.existsSync;

let writtenContent = '';

fs.writeFileSync = (path, content) => {
  writtenContent = content;
};

fs.existsSync = () => false;

// 测试每个用例
testCases.forEach(testCase => {
  console.log(`\n测试: ${testCase.name}`);
  
  // 生成脚本
  generateFlexibleScript('./test.js', testCase.options);
  
  // 验证结果
  const { expected } = testCase;
  
  if (writtenContent.includes(`baseWidth = ${expected.baseWidth}`)) {
    console.log('✅ baseWidth 正确');
  } else {
    console.log('❌ baseWidth 错误');
  }
  
  if (expected.minFontSize === null) {
    if (writtenContent.includes('minFontSize = null')) {
      console.log('✅ minFontSize 正确 (null)');
    } else {
      console.log('❌ minFontSize 错误');
    }
  } else {
    if (writtenContent.includes(`minFontSize = ${expected.minFontSize}`)) {
      console.log('✅ minFontSize 正确');
    } else {
      console.log('❌ minFontSize 错误');
    }
  }
  
  if (expected.maxFontSize === null) {
    if (writtenContent.includes('maxFontSize = null')) {
      console.log('✅ maxFontSize 正确 (null)');
    } else {
      console.log('❌ maxFontSize 错误');
    }
  } else {
    if (writtenContent.includes(`maxFontSize = ${expected.maxFontSize}`)) {
      console.log('✅ maxFontSize 正确');
    } else {
      console.log('❌ maxFontSize 错误');
    }
  }
  
  // 检查边界限制逻辑
  if (expected.hasMinLogic) {
    if (writtenContent.includes('if (minFontSize !== null && rem < minFontSize)')) {
      console.log('✅ 最小值限制逻辑存在');
    } else {
      console.log('❌ 最小值限制逻辑缺失');
    }
  } else {
    if (!writtenContent.includes('if (minFontSize !== null && rem < minFontSize)')) {
      console.log('✅ 默认无最小值限制逻辑');
    } else {
      console.log('❌ 默认应无最小值限制逻辑');
    }
  }
  if (expected.hasMaxLogic) {
    if (writtenContent.includes('if (maxFontSize !== null && rem > maxFontSize)')) {
      console.log('✅ 最大值限制逻辑存在');
    } else {
      console.log('❌ 最大值限制逻辑缺失');
    }
  } else {
    if (!writtenContent.includes('if (maxFontSize !== null && rem > maxFontSize)')) {
      console.log('✅ 默认无最大值限制逻辑');
    } else {
      console.log('❌ 默认应无最大值限制逻辑');
    }
  }
});

// 恢复原始函数
fs.writeFileSync = originalWriteFileSync;
fs.existsSync = originalExistsSync;

console.log('\n🎉 所有测试完成！'); 