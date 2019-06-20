---
id: introduction
title: Milvus 简介
sidebar_label: 1. Milvus 简介
---

## 1.1 向量是人工智能刻画世界的基本元素

随着计算机技术的不断进步，特别是以 NVIDIA GPU 为代表的新一代异构众核高性能计算芯片的出现，深度学习技术得到了更为广泛的应用。不论是基于卷积神经网络（CNN），还是基于循环神经网络（RNN），深度学习模型都会将被研究对象（图像，语音，文字，行为等）抽象成一组特征向量。向量的维度越高，往往对事物的描述也就越细致。

作为人工智能刻画现实世界的基本元素，向量的使用正变得越来越广泛：

- 图像识别、分类
  
- 视频过滤、自动标签
- 语义理解
- 语音识别与合成
- 相似度聚类

## 1.2 使用向量数据的典型行业场景

- 电商平台
  - 推荐系统：利用模型（如 word2vec）将用户购买过，访问过，收藏过的商品进行向量化后，寻找相关联的产品进行推荐。
  - 高级搜索：通过图像识别与匹配模型，使用户能够通过图片来搜索想要的商品。
  
- 商业银行
  - 实时风控：通过对交易频率，金额，模式，商户等信息的深度分析，甄别欺诈交易，洗钱等违规行为。
  - 用户留存：通过对用户账户操作行为的分析，预测用户流失的可能性。
  
- 电信
  - DDoS检测：通过深度神经网络模型，将TCP/UDP等网络协议类型，端口和报文长度向量化，可以较为精确地判定DDoS攻击意图。
  
- 信息安全
  - 病毒检测：通过对病毒二进制码进行深度学习，可以提取出病毒特定行为的特征向量，能有效检测未知新型或变种计算机病毒。
  
- 安防
  - 通过对监控摄像头实时捕获内容的向量化提取与检索，安保系统能对人员身份进行自动核实，并动态追踪可疑人员的行进轨迹。
  
- 医疗医药
  - 药物分子筛选：通过深度神经网络模型对化合物分子的向量化，能加快潜在药物分子的发现与毒性筛选。
  - 辅助影像诊断：经过对大量病理影像资料的训练学习，辅助诊断系统可以快速提取并检索医学影像中的关键特征，向医生提供诊断建议。
  
- 法律
  - 知识产权保护：通过循环神经网络模型（如 LSTM），可以构建基于语义的分析系统，更准确的判定文字作品是否遭到侵权。
  
- 制造业
  - 设备故障侦测：相比传统单一维度的实时数据，新型的多维时序数据能更好的描述工厂设备的运行状况。基于对多维时序数据的向量化计算、检索，可以更有效的发现设备故障。
  
## 1.3 Milvus

随着向量数据越来越广泛的被使用于更多的行业，人们对向量数据的检索性能和管理能力也提出了更高的要求。

Milvus 是 Zilliz 公司为优化人工智能应用执行效率，而研发的面向海量特征向量检索的数据库管理系统。Milvus 可以提供针对百亿条高维向量的秒级检索响应。

- 异构计算
  

通过支持 x86/ARM/PowerPC 等 CPU 架构，及多种异构众核加速芯片（GPU/FPGA/ASIC），Milvus 能在极低的硬件成本上提供强劲的向量检索能力。

- 智能匹配检索算法
  

Milvus 内置了目前业界主流的向量检索算法和 Zilliz 自研算法。针对不同规模，分布的特征向量数据， Milvus 能自主选择不同算法以最优化检索效率。

- 数据库管理系统
  

不同于一般的向量检索算法，Milvus 作为向量数据库管理系统，支持特征向量的实时插入，用户可以边插入数据边查询。同时，Milvus 支持存储结构化数据和非结构化数据，能针对结构化和非结构化数据进行混合查询。

- 多种访问模式
  

Milvus 提供基于 C++/Java/Python 的客户端 SDK。

- 灵活部署
  

Milvus 既可以被部署在核心数据中心（公有云、私有云和混合云环境），也可以运行在边缘节点。

- 易管理维护


Milvus 采用集群架构，支持自定义数据分区，高可用和弹性扩展。Milvus 提供图形化和命令行管理工具，及基于 Grafana/Prometheus 的可视化监控系统。

​     